import { useContext } from "react"
import BuilderContextDispatch from "../dispatch-context"

const useDispatch = () => {
    const dispatch = useContext(BuilderContextDispatch)

    return dispatch;
}

export default useDispatch;
