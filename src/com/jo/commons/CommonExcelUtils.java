package com.jo.commons;

import java.io.IOException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class CommonExcelUtils<T> {
	
    private Sheet sheet;   
    
    public CommonExcelUtils(MultipartFile file) {  
        if(file != null){  
        	String fileType = CommonFileUtils.getFileType(file.getOriginalFilename());
    		Workbook workbook = null;
    		try {
				if("xls".equals(fileType)){  
					workbook = new HSSFWorkbook(file.getInputStream());  
				}else if("xlsx".equals(fileType)){  
					workbook = new XSSFWorkbook(file.getInputStream());  
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
    		sheet = workbook.getSheetAt(0); 
        }  
    }  
    
    @SuppressWarnings("unchecked")
	public List<T> readExcel(T t, Map<String, Object> params, String attrs){
    	List<T> rsList = new ArrayList<T>();
    	int totalRow = sheet.getLastRowNum();
    	for (int i = 1; i <= totalRow; i++){
    		Row row = sheet.getRow(i);
    		Map<String, Object> pms = new HashMap<String, Object>();
    		pms.putAll(params);
    		String[] attrArry = attrs.split(",");
    		for (int j = 0; j < attrArry.length; j++){
    			Cell cell = row.getCell(j);
    			pms.put(attrArry[j], convertCell(cell));
    		}
    		System.out.println(">>>>"+pms);
    		rsList.add((T)CommonJsonUtils.newfor(pms, t.getClass()));
    	}
    	return rsList;
    }
    
	 /**
	  * excel列类型转换
	  * @Description:TODO
	  * @param cell
	  * @return String
	  * @exception:
	  * @author: hxk
	  * @time:2017-12-25 下午3:01:27
	  */
	 public String convertCell(Cell cell){
		 NumberFormat formater = NumberFormat.getInstance();
		 formater.setGroupingUsed(false);
		 String cellValue = "";
		 if(cell == null){
	        return cellValue;
	     }
		 switch (cell.getCellType()) {
			case 0://CELL_TYPE_NUMERIC 数值型 0
				cellValue = formater.format(cell.getNumericCellValue());
				break;
			case 1://CELL_TYPE_STRING 字符串型 1
				cellValue = cell.getStringCellValue();
				break;
			case 2://CELL_TYPE_FORMULA 公式型 2
				cellValue = cell.getStringCellValue();
				break;
			case 3://CELL_TYPE_BLANK 空值3
				cellValue = cell.getStringCellValue();
				break;
			case 4://CELL_TYPE_BOOLEAN 布尔型 4
				cellValue = Boolean.valueOf(cell.getBooleanCellValue()).toString();
				break;
			case 5://CELL_TYPE_ERROR 错误 5
				cellValue = String.valueOf(cell.getErrorCellValue());
				break;
			default:
				cellValue = "";
				break;
		}
	      return cellValue.trim();
	 } 
}
