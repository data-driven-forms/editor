
import Provider from "../../dnd/provider"
import useEditor from "../use-editor"

const Editor: React.FC = ({ children }) => {
  const [state, dispatch] = useEditor()

  return (
    <Provider dispatch={dispatch} state={state}>
        {children}
    </Provider>
  );
};

export default Editor;
