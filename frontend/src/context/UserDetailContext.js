import { createContext, useState } from "react"; // FLAW: Imported useState but not used

const UserDetailContext = createContext();

// FLAW: Provider not created - context is created but never provided to children
// This means any component trying to use this context will get undefined

export default UserDetailContext;
