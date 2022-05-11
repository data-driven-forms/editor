import { useContext } from "react"
import BuilderContextState from "../state-context"

const useState = () => {
    const state = useContext(BuilderContextState)

    return state;
}

export default useState;
