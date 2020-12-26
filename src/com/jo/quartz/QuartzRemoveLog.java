package com.jo.quartz;
import com.jo.sys.log.service.LogService;
/**
 * 定时删除系统日志
 * @author huixiaoke 
 * @date 2016-6-20
 */
public class QuartzRemoveLog {

	public LogService logService;
	 
	 public void work(){
		 System.out.println("Quartz的任务调度！！！");
	 }

	/**  
	 * 获取logService  
	 * @return logService logService  
	 */
	public LogService getLogService() {
		return logService;
	}

	/**  
	 * 设置logService  
	 * @param logService logService  
	 */
	public void setLogService(LogService logService) {
		this.logService = logService;
	}
	 
	 
}
