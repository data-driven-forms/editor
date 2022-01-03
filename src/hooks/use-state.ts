import { useContext } from "react"
import BuilderContextState from "./builder-context-state"

const useState = () => {
    const state = useContext(BuilderContextState)

    return state;
}

export default useState;
