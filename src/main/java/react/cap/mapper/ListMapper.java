package react.cap.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import react.cap.bean.MTable;

@Mapper
public interface ListMapper {

    List<MTable> getTable(MTable mTable);

}
