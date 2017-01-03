package com.lance.activiti.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.ProcessDefinition;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class FileExtUtils {
	private static Logger logger = LogManager.getLogger(FileExtUtils.class);
	
	public static String exportDiagramToFile(RepositoryService repositoryService, ProcessDefinition processDefinition, String exportDir) throws IOException {
        String diagramResourceName = processDefinition.getDiagramResourceName();
        String key = processDefinition.getKey();
        int version = processDefinition.getVersion();
        String diagramPath = "";

        InputStream resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), diagramResourceName);
        byte[] b = new byte[resourceAsStream.available()];

        @SuppressWarnings("unused")
        int len = -1;
        resourceAsStream.read(b, 0, b.length);

        // create file if not exist
        String diagramDir = exportDir + "/" + key + "/" + version;
        File diagramDirFile = new File(diagramDir);
        if (!diagramDirFile.exists()) {
            diagramDirFile.mkdirs();
        }
        diagramPath = diagramDir + "/" + diagramResourceName;
        File file = new File(diagramPath);

        // 文件存在退出
        if (file.exists()) {
            // 文件大小相同时直接返回否则重新创建文件(可能损坏)
            logger.debug("diagram exist, ignore... : {}", diagramPath);
            return diagramPath;
        } else {
            file.createNewFile();
        }

        logger.debug("export diagram to : {}", diagramPath);

        // wirte bytes to file
        FileUtils.writeByteArrayToFile(file, b, true);
        return diagramPath;
    }

}
