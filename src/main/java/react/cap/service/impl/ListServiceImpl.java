package react.cap.service.impl;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import react.cap.bean.MTable;
import react.cap.common.CommonServiceImpl;
import react.cap.mapper.ListMapper;
import react.cap.service.ListService;

@Service
public class ListServiceImpl extends CommonServiceImpl implements ListService {

    @Autowired
    ListMapper listMapper;

    @Override
    public Object getData(String data, Object param) {
        System.out.println(data);
        String methodName = "get" + data.substring(0, 1).toUpperCase() + data.substring(1);
        Object obj = new listMehtod();
        Object result = new Object();
        try {
            Class<?> cls = Class.forName(obj.getClass().getName());
            Method m = cls.getDeclaredMethod(methodName, Object.class);
            result = m.invoke(obj, param);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            ;
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return result;
    }

    class listMehtod {
        public List<MTable> getTable(Object mTable) {
            List<MTable> result = listMapper.getTable((MTable) mTable);

            return result;
        }
    }
}
