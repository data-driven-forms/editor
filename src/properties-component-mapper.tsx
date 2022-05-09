import Condition, { ConditionProps } from "./condition";
import componentMapper from "./evergreen-component-mapper/component-mapper";

const propertiesComponentMapper = ({
    ...componentMapper,
    'condition': (props: ConditionProps) => <Condition {...props} isRoot componentMapper={componentMapper} />
})

export default propertiesComponentMapper;
