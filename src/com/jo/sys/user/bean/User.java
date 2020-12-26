package com.jo.sys.user.bean;

public class User{
	
    private Integer userId;
    
    private Integer organId;
    
    private String organName;

    private String userName;

    private String passWord;

    private String realName;

    private Integer sex;

    private String birthday;

    private String phoneNum;

    private String qq;

    private String email;

    private String address;

    private Integer userType;
    
    private Integer status;
    
    private String remarks;

    /**创建人**/
	private Integer creator;
	/**创建时间**/
	private String createDate;
	/**修改人**/
	private Integer modify;
	/**修改时间**/
	private String modifyDate;
	
	private Integer userUse;//用户是否被使用
	/**  
	 * 获取userId  
	 * @return userId userId  
	 */
	public Integer getUserId() {
		return userId;
	}

	/**  
	 * 设置userId  
	 * @param userId userId  
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**  
	 * 获取organId  
	 * @return organId organId  
	 */
	public Integer getOrganId() {
		return organId;
	}

	/**  
	 * 设置organId  
	 * @param organId organId  
	 */
	public void setOrganId(Integer organId) {
		this.organId = organId;
	}

	/**  
	 * 获取organName  
	 * @return organName organName  
	 */
	public String getOrganName() {
		return organName;
	}

	/**  
	 * 设置organName  
	 * @param organName organName  
	 */
	public void setOrganName(String organName) {
		this.organName = organName;
	}

	/**  
	 * 获取userName  
	 * @return userName userName  
	 */
	public String getUserName() {
		return userName;
	}

	/**  
	 * 设置userName  
	 * @param userName userName  
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**  
	 * 获取passWord  
	 * @return passWord passWord  
	 */
	public String getPassWord() {
		return passWord;
	}

	/**  
	 * 设置passWord  
	 * @param passWord passWord  
	 */
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	/**  
	 * 获取realName  
	 * @return realName realName  
	 */
	public String getRealName() {
		return realName;
	}

	/**  
	 * 设置realName  
	 * @param realName realName  
	 */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**  
	 * 获取sex  
	 * @return sex sex  
	 */
	public Integer getSex() {
		return sex;
	}

	/**  
	 * 设置sex  
	 * @param sex sex  
	 */
	public void setSex(Integer sex) {
		this.sex = sex;
	}

	/**  
	 * 获取birthday  
	 * @return birthday birthday  
	 */
	public String getBirthday() {
		return birthday;
	}

	/**  
	 * 设置birthday  
	 * @param birthday birthday  
	 */
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	/**  
	 * 获取phoneNum  
	 * @return phoneNum phoneNum  
	 */
	public String getPhoneNum() {
		return phoneNum;
	}

	/**  
	 * 设置phoneNum  
	 * @param phoneNum phoneNum  
	 */
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	/**  
	 * 获取qq  
	 * @return qq qq  
	 */
	public String getQq() {
		return qq;
	}

	/**  
	 * 设置qq  
	 * @param qq qq  
	 */
	public void setQq(String qq) {
		this.qq = qq;
	}

	/**  
	 * 获取email  
	 * @return email email  
	 */
	public String getEmail() {
		return email;
	}

	/**  
	 * 设置email  
	 * @param email email  
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**  
	 * 获取address  
	 * @return address address  
	 */
	public String getAddress() {
		return address;
	}

	/**  
	 * 设置address  
	 * @param address address  
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**  
	 * 获取userType  
	 * @return userType userType  
	 */
	public Integer getUserType() {
		return userType;
	}

	/**  
	 * 设置userType  
	 * @param userType userType  
	 */
	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	/**  
	 * 获取status  
	 * @return status status  
	 */
	public Integer getStatus() {
		return status;
	}

	/**  
	 * 设置status  
	 * @param status status  
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**  
	 * 获取remarks  
	 * @return remarks remarks  
	 */
	public String getRemarks() {
		return remarks;
	}

	/**  
	 * 设置remarks  
	 * @param remarks remarks  
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**  
	 * 获取创建人  
	 * @return creator 创建人  
	 */
	public Integer getCreator() {
		return creator;
	}

	/**  
	 * 设置创建人  
	 * @param creator 创建人  
	 */
	public void setCreator(Integer creator) {
		this.creator = creator;
	}

	/**  
	 * 获取创建时间  
	 * @return createDate 创建时间  
	 */
	public String getCreateDate() {
		return createDate;
	}

	/**  
	 * 设置创建时间  
	 * @param createDate 创建时间  
	 */
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	/**  
	 * 获取修改人  
	 * @return modify 修改人  
	 */
	public Integer getModify() {
		return modify;
	}

	/**  
	 * 设置修改人  
	 * @param modify 修改人  
	 */
	public void setModify(Integer modify) {
		this.modify = modify;
	}

	/**  
	 * 获取修改时间  
	 * @return modifyDate 修改时间  
	 */
	public String getModifyDate() {
		return modifyDate;
	}

	/**  
	 * 设置修改时间  
	 * @param modifyDate 修改时间  
	 */
	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	/**  
	 * 获取userUse  
	 * @return userUse userUse  
	 */
	public Integer getUserUse() {
		return userUse;
	}

	/**  
	 * 设置userUse  
	 * @param userUse userUse  
	 */
	public void setUserUse(Integer userUse) {
		this.userUse = userUse;
	}
    
}