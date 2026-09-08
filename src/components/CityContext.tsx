"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { GCC_CITIES } from "@/lib/copy";

export type City = (typeof GCC_CITIES)[number];

const CityContext = createContext<{ city: City; setCityId: (id: string) => void }>({
  city: GCC_CITIES[0],
  setCityId: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [cityId, setCityId] = useState<string>("dubai");
  const city = GCC_CITIES.find((c) => c.id === cityId) ?? GCC_CITIES[0];
  return <CityContext.Provider value={{ city, setCityId }}>{children}</CityContext.Provider>;
}

export function useCity() {
  return useContext(CityContext);
}
