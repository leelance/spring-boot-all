# spring-boot-crawler, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [OKHttp](http://square.github.io/okhttp/)



> * 执行CrawlerTest, 测试抓取页面URL, 根据URL递归抓取

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Spring-Boot-Crawler.v1.1
spring.application.name=Spring-Boot-Crawler

security.basic.enabled=false
management.security.enabled=false

#LOG
logging.config=classpath:log4j2.xml
```
JUnitTest
```java
public class CrawlerTest {
	Logger logger = LogManager.getLogger(getClass());

	@Test
	public void run() throws InterruptedException, ExecutionException{
		String[] urls = {"https://www.baidu.com/"};
		List<Future<String>> results = Crawler.getInstance().initUrl(urls).parallelDrainQueue(3);
		for(Future<String> future: results) {
			logger.info("result: {}", future.get());
		}
	}
}
```

Crawler
```java
public class Crawler {
	Logger logger = LogManager.getLogger(getClass());
	private OkHttpClient client = null;
	private final Set<HttpUrl> fetchedUrls = Collections.synchronizedSet(new LinkedHashSet<HttpUrl>());
	private final BlockingQueue<HttpUrl> queue = new LinkedBlockingQueue<>();
	private final ConcurrentMap<String, AtomicInteger> hostnames = new ConcurrentHashMap<>();

	private static class CrawlerHolder {
		private static final Crawler INSTANCE = new Crawler();
	}

	private Crawler() {
		init();
	}

	public static final Crawler getInstance() {
		return CrawlerHolder.INSTANCE;
	}

	public Crawler initUrl(String[] urls) {
		for (String url: urls) {
			queue.add(HttpUrl.parse(url));
		}

		return this;
	}

	private void init() {
		long cacheByteCount = 1024 * 1024 * 100;
		String dir = "C:\\test";
		Cache cache = new Cache(new File(dir), cacheByteCount);
		client = new OkHttpClient.Builder().cache(cache).build();
	}

	public List<Future<String>> parallelDrainQueue(int threadCount) {
		ExecutorService executor = Executors.newFixedThreadPool(threadCount);
		List<Future<String>> results = new ArrayList<>();
		for (int i = 0; i < threadCount; i++) {
			Future<String> future = executor.submit(new Callable<String>() {
				@Override
				public String call() throws Exception {
					try {
						drainQueue();
					} catch (Exception e) {
						e.printStackTrace();
					}
					return null;
				}
			});

			results.add(future);
		}
		return results;
	}

	private void drainQueue() throws Exception {
		for (HttpUrl url; (url = queue.take()) != null;) {
			if (!fetchedUrls.add(url)) {
				continue;
			}

			try {
				fetch(url);
			} catch (IOException e) {
				logger.info("Error: {} {}", url, e);
			}
		}
	}

	private void fetch(HttpUrl url) throws IOException {
		AtomicInteger hostnameCount = new AtomicInteger();
		AtomicInteger previous = hostnames.putIfAbsent(url.host(), hostnameCount);
		if (previous != null){
			hostnameCount = previous;
		}
			
		if (hostnameCount.incrementAndGet() > 100){
			return;
		}

		Request request = new Request.Builder().url(url).build();
		Response response = client.newCall(request).execute();
		String responseSource = response.networkResponse() != null
				? ("(network: " + response.networkResponse().code() + " over " + response.protocol() + ")") : "(cache)";
		int responseCode = response.code();

		// 打印log
		logger.info("ThreadName:{},ResponseCode:{},URL:{},ResponseSource:{}", Thread.currentThread().getName(),
				responseCode, url, responseSource);

		String contentType = response.header("Content-Type");
		if (responseCode != 200 || contentType == null) {
			response.body().close();
			return;
		}

		MediaType mediaType = MediaType.parse(contentType);
		if (mediaType == null || !mediaType.subtype().equalsIgnoreCase("html")) {
			response.body().close();
			return;
		}

		// 获取页面的a[href], 加入LinkedBlockingQueue
		Document document = Jsoup.parse(response.body().string(), url.toString());
		for (Element element: document.select("a[href]")) {
			String href = element.attr("href");
			HttpUrl link = response.request().url().resolve(href);
			if (link != null) {
				queue.add(link);
			}
		}
	}
}
```
SimpleApplication
```java
@SpringBootApplication
public class SimpleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
```
