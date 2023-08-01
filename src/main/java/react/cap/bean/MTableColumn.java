package react.cap.bean;

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
public class MTableColumn extends CommonBean {

    @Id
    int tableColumnId;
    int tableId;
    String tableColumnName;
    String tableColumnNameJp;
    String tableColumnDataType;
    String tableColumnDigits;
    String tableColumnIsPk;
    String tableColumnIsFk;
    String tableColumnIsNn;
    String tableColumnIsAi;
    String tableColumnDefault;
}
