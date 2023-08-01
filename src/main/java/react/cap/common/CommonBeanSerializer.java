package react.cap.common;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * 共通Beanクラス
 *
 * @author Kunitaka Kimura (CAP)
 *
 */
public class CommonBeanSerializer implements JsonSerializer<CommonBean> {

    @Override
    public JsonElement serialize(final CommonBean vo, final Type typeOfVo, final JsonSerializationContext context) {
        return context.serialize(vo);
    }
}
