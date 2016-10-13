$(function() {
  var springfox = {
    "baseUrl": function() {
      var urlMatches = /(.*)\/fox.html.*/.exec(window.location.href);
      return urlMatches[1];
    },
    "uiConfig": function(cb) {
	  var urConfigJson = {"validatorUrl":null,"docExpansion":"none","apisSorter":"alpha","defaultModelRendering":"schema","supportedSubmitMethods"
							:["get","post","put","delete","patch"],"jsonEditor":false,"showRequestHeaders":true};
        cb(urConfigJson);
    }
  };
  window.springfox = springfox;

  window.springfox.uiConfig(function(data) {
    window.swaggerUi = new SwaggerUi({
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: data.supportedSubmitMethods || ['get', 'post', 'put', 'delete', 'patch'],
      onComplete: function(swaggerApi, swaggerUi) {

        if (window.SwaggerTranslator) {
          window.SwaggerTranslator.translate();
        }

        $('pre code').each(function(i, e) {
          hljs.highlightBlock(e)
        });

      },
      onFailure: function(data) {
        log("Unable to Load SwaggerUI");
      },
      docExpansion: data.docExpansion || 'none',
      jsonEditor: JSON.parse(data.jsonEditor) || false,
      apisSorter: data.apisSorter || 'alpha',
      defaultModelRendering: data.defaultModelRendering || 'schema',
      showRequestHeaders: data.showRequestHeaders || true
    });

    initializeBaseUrl();

    function addApiKeyAuthorization(security) {
      var apiKeyVehicle = security.apiKeyVehicle || 'query';
      var apiKeyName = security.apiKeyName || 'api_key';
      var apiKey = security.apiKey || '';
      if (apiKey && apiKey.trim() != "") {
        var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization(apiKeyName, apiKey, apiKeyVehicle);
        window.swaggerUi.api.clientAuthorizations.add(apiKeyName, apiKeyAuth);
        log("added key " + apiKey);
      }
    }

    function log() {
      if ('console' in window) {
        console.log.apply(console, arguments);
      }
    }
  });

  $('#select_baseUrl').change(function() {
	var selUrl = $('#select_baseUrl').val();
    window.swaggerUi.headerView.trigger('update-swagger-ui', {
      url: selUrl
    });
  });

  function maybePrefix(location, withRelativePath) {
    var pat = /^https?:\/\//i;
    if (pat.test(location)) {
      return location;
    }
    return withRelativePath + location;
  }

  function initializeBaseUrl() {
    var relativeLocation = springfox.baseUrl();

    $('#input_baseUrl').hide();

	var data = [{"name":"Admin API","location":"/v2/api-docs?group=Admin API","swaggerVersion":"2.0"}];

      var $urlDropdown = $('#select_baseUrl');
      $urlDropdown.empty();
      $.each(data, function(i, resource) {
        var option = $('<option></option>')
            .attr("value", relativeLocation+'/swagger.json')
            .text(resource.name + " (" + resource.location + ")");
        $urlDropdown.append(option);
      });
      //$urlDropdown.change();
	  window.swaggerUi.headerView.trigger('update-swagger-ui', {
		  url: '/api/swagger.json'
	  });
  }

});

