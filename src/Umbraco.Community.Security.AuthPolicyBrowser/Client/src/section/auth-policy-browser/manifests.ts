import { manifests as menuItems } from "./menu-item/manifests";
import { manifests as modals } from "./modals/manifests";
import { manifests as workspaces } from "./workspace/manifests";

export const manifests = [...menuItems, ...modals, ...workspaces];
