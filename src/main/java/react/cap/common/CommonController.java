package react.cap.common;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class CommonController {

    public ResponseEntity<Object> toResponseEntity(Object obj) {
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", MediaType.APPLICATION_JSON_VALUE + "; charset=utf-8");
        return new ResponseEntity<Object>(toJson(obj), responseHeaders, HttpStatus.OK);
    }

    protected static String toJson(final Object obj) {
        final GsonBuilder gbuilder = new GsonBuilder();
        gbuilder.registerTypeAdapter(CommonBean.class, new CommonBeanSerializer());

        final Gson gson = gbuilder.create();
        return gson.toJson(obj);
    }

}
