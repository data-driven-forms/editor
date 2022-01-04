import DropCursor from "../drop-cursor"
import BuilderContextDispatch from "./builder-context-dispatch"
import BuilderContextState from "./builder-context-state"
import useBuilderState from "./use-builder-state"

const Editor: React.FC = ({ children }) => {
  const [state, dispatch] = useBuilderState()

  return (
    <BuilderContextDispatch.Provider value={dispatch}>
      <BuilderContextState.Provider value={state}>
        {state.draggingElement && <DropCursor />}
        {children}
      </BuilderContextState.Provider>
    </BuilderContextDispatch.Provider>
  );
};

export default Editor;
