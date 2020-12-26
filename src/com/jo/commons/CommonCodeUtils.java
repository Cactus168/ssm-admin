package com.jo.commons;
import com.sun.crypto.provider.SunJCE;
import java.security.Key;
import java.security.Security;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class CommonCodeUtils{
   private static String strDefaultKey = "zhaobinhu";

   private static CommonCodeUtils ccu = new CommonCodeUtils();

   private Cipher encryptCipher = null;

   private Cipher decryptCipher = null;

  public static String byteArr2HexStr(byte[] arrB)
  {
     int iLen = arrB.length;

     StringBuffer sb = new StringBuffer(iLen * 2);

     for (int i = 0; i < iLen; i++)
    {
       int intTmp = arrB[i];

       while (intTmp < 0)
      {
         intTmp += 256;
      }
       if (intTmp < 16)
      {
         sb.append("0");
      }
       sb.append(Integer.toString(intTmp, 16));
    }

     return sb.toString();
  }

  public static byte[] hexStr2ByteArr(String strIn)
  {
     byte[] arrB = strIn.getBytes();

     int iLen = arrB.length;

     byte[] arrOut = new byte[iLen / 2];

     for (int i = 0; i < iLen; i += 2)
    {
       String strTmp = new String(arrB, i, 2);

       arrOut[(i / 2)] = (byte)Integer.parseInt(strTmp, 16);
    }

     return arrOut;
  }

  private CommonCodeUtils()
  {
     this(strDefaultKey);
  }

  private CommonCodeUtils(String strKey)
  {
     Security.addProvider(new SunJCE());
    try
    {
       Key key = getKey(strKey.getBytes());

       this.encryptCipher = Cipher.getInstance("DES");

       this.encryptCipher.init(1, key);

       this.decryptCipher = Cipher.getInstance("DES");

       this.decryptCipher.init(2, key);
    }
    catch (Exception e)
    {
       e.printStackTrace();
    }
  }

  public byte[] encrypt(byte[] arrB)
  {
     byte[] encrypt = null;
    try
    {
       encrypt = this.encryptCipher.doFinal(arrB);
    }
    catch (Exception e)
    {
       e.printStackTrace();
    }

     return encrypt;
  }

  public static String code(String strIn)
  {
     return byteArr2HexStr(ccu.encrypt(strIn.getBytes()));
  }

  public byte[] decrypt(byte[] arrB)
  {
     byte[] decrypt = null;
    try
    {
       decrypt = this.decryptCipher.doFinal(arrB);
    }
    catch (Exception e)
    {
       e.printStackTrace();
    }
     return decrypt;
  }

  public static String decode(String strIn)
  {
     if (strIn.equals("-1")) return "-1";

     return new String(ccu.decrypt(hexStr2ByteArr(strIn)));
  }

  private Key getKey(byte[] arrBTmp) throws Exception
  {
     byte[] arrB = new byte[8];

     for (int i = 0; (i < arrBTmp.length) && (i < arrB.length); i++) {
       arrB[i] = arrBTmp[i];
    }

     Key key = new SecretKeySpec(arrB, "DES");

     return key;
  }

  public static void main(String[] args)
  {
    CommonCodeUtils code = new CommonCodeUtils(); 
    
    System.out.println(code.decode("662a1ad8877007e3c0f417432bdd5fb06a53ac876e583fa4fd18e4860ce6627db1ca36221ccc83c20759dc03f4d38471e4c71fd147313d9a2a710da251ca1d8d08c005ebc0bc673cec0f542584d397f9d08893ab7cf29b0220ef1265abc3b33fc997e1ec5e2b54322267dce4470254ad88f59d920a415942278d06e9ecf1de2c9fee7c8ff4cf5a80b30f9498ec48a71862abb9a92b7224efd51422575a3410a01cc40adf21103ef4854c28bce6d5cf01"));
    System.out.println(code.code("jdbc:mysql://127.0.0.1:3306/ssm-admin?useUnicode=true&amp;characterEncoding=utf8&amp;allowMultiQueries=true&amp;autoReconnect=true&amp;failOverReadOnly=false&amp;maxReconnects=10"));
    System.out.println(code.decode("2c8031bbe5042fa35b98e6fa0e580299e89748b931a0f7fe"));
    System.out.println(code.code("wd"));
    
    System.out.println(code.code("admin"));
    
    System.out.println(code.code("stat"));
    
    System.out.println(code.code("net.bull.javamelody.JdbcDriver"));
    
  }
}