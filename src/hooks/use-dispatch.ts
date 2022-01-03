import { useContext } from "react"
import BuilderContextDispatch from "./builder-context-dispatch"

const useDispatch = () => {
    const dispatch = useContext(BuilderContextDispatch)

    return dispatch;
}

export default useDispatch;
