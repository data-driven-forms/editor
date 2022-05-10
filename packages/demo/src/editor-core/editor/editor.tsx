
import Provider from "../../dnd/provider"
import { AnyObject } from "../../dnd/types";
import useEditor from "../use-editor"

export interface EditorProps extends AnyObject {};

const Editor: React.FC<EditorProps> = ({ children, ...props }) => {
  const [state, dispatch] = useEditor()

  return (
    <Provider dispatch={dispatch} state={state} {...props}>
        {children}
    </Provider>
  );
};

export default Editor;
