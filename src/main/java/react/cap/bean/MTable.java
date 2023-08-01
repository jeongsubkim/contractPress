package react.cap.bean;

import java.util.List;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import react.cap.common.CommonBean;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class MTable extends CommonBean {

    @Id
    int tableId;
    String tableName;
    String tableNameJp;
    String tableComment;
    List<MTableColumn> mTableColumn;

}
