import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IState } from "../store/index";

export const useTypedSelector: TypedUseSelectorHook<IState> = useSelector;
