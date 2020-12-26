package com.jo.commons;

import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;
import org.apache.commons.lang3.StringUtils;

/**
 * 文件处理类
 * @author huixiaoke 
 * @date 2017-2-8
 *   
 */
public class CommonFileUtils {
	
	private static final String SEPARATOR_SPOT = ".";
	
	private static final String SEPARATOR_SPRIT = "\\";
	
	private static final String SEPARATOR_COLON = ":";
	
	public static void main(String[] args){
		System.out.println(getFileType("xxx.xls"));
		System.out.println(codeFileName("xxx.xls"));
		System.out.println(deCodeFileName(codeFileName("xxx.xls")));
		//isFolderExitAndCreate("d:\fileTest");
		isFileExitAndCreate("d:/fileTest","text.txt");
		deleteFile("d"+SEPARATOR_COLON+SEPARATOR_SPRIT+"fileTest/text.txt");
		System.out.println(File.separator);
		System.out.println(File.pathSeparator);
		System.out.println(File.pathSeparatorChar);
	}
	/**
	 * 判断文件夹是否存在，如不存在则创建
	 * @param String folderPath 如 c:/text
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static void isFolderExitAndCreate(String folderPath){
		File file = new File(folderPath);
		if(!file.exists()){
			file.mkdirs();
		}
	}
	/**
	 * 判断文件是否存在，如不存在则创建
	 * @param String folderPath 如 c:/text
	 * @param String fileName 如：text.txt
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static void isFileExitAndCreate(String folderPath, String fileName){
		try {
			isFolderExitAndCreate(folderPath);
			File file = new File(fileName);
			if(!file.exists()){
				file.createNewFile();
			}
		} catch (IOException e) {
			System.out.println("新建目录操作出错");
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除单个文件
	 * @param String filePath 如：c:/text/text.txt
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static void deleteFile(String filePath){
		File file = new File(filePath);
		if(file.isFile() && file.exists()){
			file.delete();
		}
	}
	/**
	 * 删除文件夹
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static void deleteFolder(String folderPath){
		 // 删除文件夹里面所有内容
		delAllFile(folderPath); 
		File file = new File(folderPath);
		if(file.exists()){
			file.delete();
		}
	}
	/**
	 * 删除文件夹里面的所有文件
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void delAllFile(String folderPath){
		File file = new File(folderPath);
		if(file.isDirectory() && file.exists()){
			String[] childFiles = file.list();
			File temp = null;
			for(String childFile : childFiles){
				 //File.separator与系统有关的默认名称分隔符
	            //在UNIX系统上，此字段的值为'/'；在Microsoft Windows系统上，它为 '\'。
	            if (folderPath.endsWith(File.separator)) {
	                temp = new File(folderPath + childFile);
	            } else {
	                temp = new File(folderPath + File.separator + childFile);
	            }
	            if (temp.isFile()) {
	                temp.delete();
	            }
	            if (temp.isDirectory()) {
	                delAllFile(folderPath + File.separator + childFile);// 先删除文件夹里面的文件
	                deleteFolder(folderPath + File.separator + childFile);// 再删除空文件夹
	            }
			}
		}
	}
	/**
	 * 复制单个文件
	 * @param srcFile 包含路径的源文件 如：E:/phsftp/src/abc.txt
	 * @param dirDest 目标文件目录；若文件目录不存在则自动创建  如：E:/phsftp/dest
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void copyFile(String srcFile, String dirDest){
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			isFolderExitAndCreate(dirDest);
			fis = new FileInputStream(srcFile);
			fos = new FileOutputStream(dirDest+File.separator+new File(srcFile).getName());
			int len;
			byte buffer[] = new byte[1024];
			while ((len = fis.read(buffer)) != -1) {
				fos.write(buffer,0,len);
			}
			fos.flush();
			fos.close();
			fis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				fos.close();
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 复制文件夹
	 * @param oldPath 源文件夹路径 如：E:/phsftp/src
	 * @param newPath 目标文件夹路径 如：E:/phsftp/dest
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void copyFolder(String oldPath, String newPath){
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			isFolderExitAndCreate(newPath);
			File file = new File(oldPath);
			String[] files = file.list();
			File temp = null;
			for(String filex : files){
				if(filex.endsWith(File.separator)){
					temp = new File(oldPath+filex);
				}else{
					temp = new File(oldPath + File.separator + filex);
				}
				if(temp.isFile()){
					fis = new FileInputStream(temp);
					fos = new FileOutputStream(newPath + File.separator +temp.getName());
					int len;
					byte[] buffer = new byte[1024];
					while ((len = fis.read(buffer)) != -1) {
						fos.write(buffer, 0, len);
					}
					fos.flush();
					fos.close();
					fis.close();
				}
				if(temp.isDirectory()){
					copyFolder(oldPath + File.separator + filex, newPath + File.separator + filex);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				fos.close();
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 移动文夹到指定目录
	 * @param oldPath 源文件夹路径 如：E:/phsftp/src
	 * @param newPath 目标文件夹路径 如：E:/phsftp/dest
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void moveFile(String oldPath, String newPath){
		copyFile(oldPath, newPath);
		deleteFile(oldPath);
	}
	/**
	 * 移动文件夹到指定目录
	 * @param oldPath 源文件夹路径 如：E:/phsftp/src
	 * @param newPath 目标文件夹路径 如：E:/phsftp/dest
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void moveFolder(String oldPath, String newPath){
		copyFolder(oldPath, newPath);
		deleteFolder(oldPath);
	}
	/**
	 * 压缩文件
	 * @param filePath 源文件夹路径 如：E:/phsftp/src
	 * @param zipPath 目标文件夹路径 如：E:/phsftp/dest
	 * @author huixiaoke
	 * @date 2017-2-9
	 */
	public static void zipFile(String filePath, String zipPath, String zipName, String base){
		ZipOutputStream zos = null;
		try {
			isFolderExitAndCreate(zipPath);
			File file = new File(filePath);
			zos = new ZipOutputStream(new FileOutputStream(zipPath+zipName));
			zip(zos, file, "");
			zos.flush();
			zos.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				zos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	private static void zip(ZipOutputStream out, File file, String base){
		FileInputStream fis = null;
		try {
			if (file.isDirectory()) {
				File[] fl = file.listFiles();
				out.putNextEntry(new ZipEntry(base + "/"));
				base = base.length() == 0 ? "" : base + "/";
				for (int i = 0; i < fl.length; i++) {
					zip(out, fl[i], base + fl[i].getName());
				}
			} else {
				out.putNextEntry(new ZipEntry(base));
				fis = new FileInputStream(file);
				int len;
				byte[] buffer = new byte[1024];
				while ((len = fis.read(buffer)) != -1) {
					out.write(buffer,0,len);
				}
				fis.close();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				if(fis != null){
					fis.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
     * 解压缩ZIP文件，将ZIP文件里的内容解压到descFileName目录下
     * @param zipFileName 需要解压的ZIP文件
     * @param descFileName 目标文件
     */
    public static boolean unZipFiles(String zipFileName, String descFileName) {
        String descFileNames = descFileName;
        if (!descFileNames.endsWith(File.separator)) {
            descFileNames = descFileNames + File.separator;
        }      
        try {
            // 根据ZIP文件创建ZipFile对象
            ZipFile zipFile = new ZipFile(zipFileName);
            ZipEntry entry = null;
            String entryName = null;
            String descFileDir = null;
            byte[] buf = new byte[4096];
            int readByte = 0;
            // 获取ZIP文件里所有的entry
            @SuppressWarnings("rawtypes")
            Enumeration enums = zipFile.entries();
            // 遍历所有entry
            while (enums.hasMoreElements()) {
                entry = (ZipEntry) enums.nextElement();
                // 获得entry的名字
                entryName = entry.getName();
                descFileDir = descFileNames + entryName;
                if (entry.isDirectory()) {
                    // 如果entry是一个目录，则创建目录
                    new File(descFileDir).mkdirs();
                    continue;
                } else {
                    // 如果entry是一个文件，则创建父目录
                    new File(descFileDir).getParentFile().mkdirs();
                }
                File file = new File(descFileDir);
                // 打开文件输出流
                OutputStream os = new FileOutputStream(file);
                // 从ZipFile对象中打开entry的输入流
                InputStream is = zipFile.getInputStream(entry);
                while ((readByte = is.read(buf)) != -1) {
                    os.write(buf, 0, readByte);
                }
                os.close();
                is.close();
            }
            zipFile.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    /**
	 * 读取到字节数组1
	 * 
	 * @param filePath
	 * @return
	 * @throws IOException
	 */
	public static byte[] toByteArray(String filePath) throws IOException {
		File f = new File(filePath);
		if (!f.exists()) {
			throw new FileNotFoundException(filePath);
		}
		ByteArrayOutputStream bos = new ByteArrayOutputStream((int) f.length());
		BufferedInputStream in = null;
		try {
			in = new BufferedInputStream(new FileInputStream(f));
			int buf_size = 1024;
			byte[] buffer = new byte[buf_size];
			int len = 0;
			while (-1 != (len = in.read(buffer, 0, buf_size))) {
				bos.write(buffer, 0, len);
			}
			return bos.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			bos.close();
		}
	}

	/**
	 * 读取到字节数组2
	 * 
	 * @param filePath
	 * @return
	 * @throws IOException
	 */
	public static byte[] toByteArray2(String filePath) throws IOException {
		File f = new File(filePath);
		if (!f.exists()) {
			throw new FileNotFoundException(filePath);
		}
		FileChannel channel = null;
		FileInputStream fs = null;
		try {
			fs = new FileInputStream(f);
			channel = fs.getChannel();
			ByteBuffer byteBuffer = ByteBuffer.allocate((int) channel.size());
			while ((channel.read(byteBuffer)) > 0) {
				// do nothing
				// System.out.println("reading");
			}
			return byteBuffer.array();
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} finally {
			try {
				channel.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				fs.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * Mapped File way MappedByteBuffer 可以在处理大文件时，提升性能
	 * 
	 * @param filename
	 * @return
	 * @throws IOException
	 */
	public static byte[] toByteArray3(String filePath) throws IOException {
		FileChannel fc = null;
		RandomAccessFile rf = null;
		try {
			rf = new RandomAccessFile(filePath, "r");
			fc = rf.getChannel();
			MappedByteBuffer byteBuffer = fc.map(MapMode.READ_ONLY, 0, fc.size()).load();
			byte[] result = new byte[(int) fc.size()];
			if (byteBuffer.remaining() > 0) {
				byteBuffer.get(result, 0, byteBuffer.remaining());
			}
			return result;
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} finally {
			try {
				rf.close();
				fc.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
     * 将内容写入文件
     * @param content
     * @param filePath
     */
    public static void writeFile(String content, String filePath) {
        try {
            FileWriter fileWriter = new FileWriter(filePath, true);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(content);
            bufferedWriter.close();
            fileWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
     
    /**
     * 追加文件内容
     */
     /**   
     * 追加文件：使用RandomAccessFile   
     *    
     * @param fileName 文件名   
     * @param content 追加的内容   
     */    
    public static void appendFile(String filePath, String content) {   
        RandomAccessFile randomFile = null;  
        try {     
            // 打开一个随机访问文件流，按读写方式     
            randomFile = new RandomAccessFile(filePath, "rw");     
            // 文件长度，字节数     
            long fileLength = randomFile.length();     
            // 将写文件指针移到文件尾。     
            randomFile.seek(fileLength);
            randomFile.writeUTF(content);
        } catch (IOException e) {     
            e.printStackTrace();     
        } finally{  
            if(randomFile != null){  
                try {  
                    randomFile.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    } 
	/**
	 * 根据文件名获取文件类型
	 * @param String fileName
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String getFileType(String fileName){
		return StringUtils.substringAfterLast(fileName, SEPARATOR_SPOT);
	}
	/**
	 * 根据文件获取文件类型
	 * @param File file
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String getFileType(File file){
		return getFileType(file.getName());
	}
	/**
	 * 加密文件名
	 * @param String fileName
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String codeFileName(String fileName){
		return CommonCodeUtils.code(StringUtils.substringBeforeLast(fileName, SEPARATOR_SPOT))+SEPARATOR_SPOT+getFileType(fileName);
	}
	/**
	 * 解密文件名
	 * @param String fileName
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String deCodeFileName(String fileName){
		return CommonCodeUtils.decode(StringUtils.substringBeforeLast(fileName, SEPARATOR_SPOT))+SEPARATOR_SPOT+getFileType(fileName);
	}
	/**
	 * 加密文件名
	 * @param File file
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String codeFileName(File file){
		return CommonCodeUtils.code(StringUtils.substringBeforeLast(file.getName(), SEPARATOR_SPOT))+SEPARATOR_SPOT+getFileType(file);
	}
	/**
	 * 解密文件名
	 * @param File file
	 * @author huixiaoke
	 * @date 2017-2-8
	 */
	public static String deCodeFileName(File file){
		return CommonCodeUtils.decode(StringUtils.substringBeforeLast(file.getName(), SEPARATOR_SPOT))+SEPARATOR_SPOT+getFileType(file);
	}
	
}
