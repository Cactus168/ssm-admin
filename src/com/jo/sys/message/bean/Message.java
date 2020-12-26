package com.jo.sys.message.bean;

public class Message {

	private Integer messageId;
	
	private Integer sendUser;
	
	private String sendDate;
	
	private String sendContent;
	
	private Integer receiveUser;
	
	private String receiveDate;

	/**  
	 * 获取messageId  
	 * @return messageId messageId  
	 */
	public Integer getMessageId() {
		return messageId;
	}

	/**  
	 * 设置messageId  
	 * @param messageId messageId  
	 */
	public void setMessageId(Integer messageId) {
		this.messageId = messageId;
	}

	/**  
	 * 获取sendUser  
	 * @return sendUser sendUser  
	 */
	public Integer getSendUser() {
		return sendUser;
	}

	/**  
	 * 设置sendUser  
	 * @param sendUser sendUser  
	 */
	public void setSendUser(Integer sendUser) {
		this.sendUser = sendUser;
	}

	/**  
	 * 获取sendDate  
	 * @return sendDate sendDate  
	 */
	public String getSendDate() {
		return sendDate;
	}

	/**  
	 * 设置sendDate  
	 * @param sendDate sendDate  
	 */
	public void setSendDate(String sendDate) {
		this.sendDate = sendDate;
	}

	/**  
	 * 获取sendContent  
	 * @return sendContent sendContent  
	 */
	public String getSendContent() {
		return sendContent;
	}

	/**  
	 * 设置sendContent  
	 * @param sendContent sendContent  
	 */
	public void setSendContent(String sendContent) {
		this.sendContent = sendContent;
	}

	/**  
	 * 获取receiveUser  
	 * @return receiveUser receiveUser  
	 */
	public Integer getReceiveUser() {
		return receiveUser;
	}

	/**  
	 * 设置receiveUser  
	 * @param receiveUser receiveUser  
	 */
	public void setReceiveUser(Integer receiveUser) {
		this.receiveUser = receiveUser;
	}

	/**  
	 * 获取receiveDate  
	 * @return receiveDate receiveDate  
	 */
	public String getReceiveDate() {
		return receiveDate;
	}

	/**  
	 * 设置receiveDate  
	 * @param receiveDate receiveDate  
	 */
	public void setReceiveDate(String receiveDate) {
		this.receiveDate = receiveDate;
	}
	
	
}
