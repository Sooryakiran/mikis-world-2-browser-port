package javax.microedition.rms;

import java.util.Arrays;
import web.Browser;
import web.Resources;

public final class RecordStore {
    private final String name;
    private boolean closed;
    private RecordStore(String name) { this.name=name; }
    public static RecordStore openRecordStore(String name, boolean create) throws RecordStoreException {
        String result=Browser.rms(name,create ? "create" : "open",0,null);
        if (result==null) throw new RecordStoreNotFoundException(name);
        return new RecordStore(name);
    }
    public static void deleteRecordStore(String name) throws RecordStoreException {
        if (Browser.rms(name,"delete",0,null)==null) throw new RecordStoreNotFoundException(name);
    }
    private void check() throws RecordStoreException {
        if (closed) throw new RecordStoreException("Store closed: "+name);
    }
    public int getNumRecords() throws RecordStoreException {
        check(); return Integer.parseInt(Browser.rms(name,"count",0,null));
    }
    public byte[] getRecord(int id) throws RecordStoreException {
        check(); String data=Browser.rms(name,"get",id,null);
        if (data==null) throw new RecordStoreException("Invalid record ID: "+id);
        byte[] bytes=new byte[data.length()];
        for (int i=0;i<bytes.length;i++) bytes[i]=(byte)data.charAt(i);
        return bytes;
    }
    public int addRecord(byte[] data,int offset,int count) throws RecordStoreException {
        check(); return Integer.parseInt(Browser.rms(name,"add",0,Resources.binary(Arrays.copyOfRange(data,offset,offset+count))));
    }
    public void setRecord(int id,byte[] data,int offset,int count) throws RecordStoreException {
        check();
        if (Browser.rms(name,"set",id,Resources.binary(Arrays.copyOfRange(data,offset,offset+count)))==null) {
            throw new RecordStoreException("Invalid record ID: "+id);
        }
    }
    public void closeRecordStore() throws RecordStoreException { check(); closed=true; }
}
