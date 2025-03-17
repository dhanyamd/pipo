import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type page = 'create' | 'creative-ai' | 'create-scratch'
type PromptStore = {
    page: page
    setPage: (page: page) => void
}
const usePromptStore = create<PromptStore>()(
    devtools(persist((set) => ({
        page: 'create',
        setPage: (page: page) => {
            set({ page })
        },
    }),
{ name: 'prompts'}
))
)

export default usePromptStore