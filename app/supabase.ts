import { createClient } from '@supabase/supabase-js'

// Yahan humne aapka link directly daal diya hai
const supabaseUrl = "https://wnselhgatgtdrcqbguey.supabase.co"

// Niche in inverted commas (" ") ke andar apni lambi wali Publishable Key paste karein!
const supabaseAnonKey = "sb_publishable_VlVl1gDPCJtZemU5kvfxVA_TkRaH0eV" 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)