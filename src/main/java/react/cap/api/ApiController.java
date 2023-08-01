package react.cap.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import react.cap.bean.MTable;
import react.cap.common.CommonController;
import react.cap.service.ListService;

@RestController
@RequestMapping("/api")
public class ApiController extends CommonController {

    @Autowired
    ListService listService;

    @RequestMapping(value = "/list/{data}", method = RequestMethod.GET)
    public ResponseEntity<Object> data(@PathVariable("data") String data) {
        MTable mTable = new MTable();
        return toResponseEntity(listService.getData(data, mTable));
    }

}