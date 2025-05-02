export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      culture_fields: {
        Row: {
          created_at: string | null
          culture: string
          estimated_harvest_date: string
          health: number
          id: string
          irrigation: number
          name: string
          planted_date: string
          position: string
          status: string
          surface: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          culture: string
          estimated_harvest_date: string
          health?: number
          id?: string
          irrigation?: number
          name: string
          planted_date: string
          position?: string
          status: string
          surface: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          culture?: string
          estimated_harvest_date?: string
          health?: number
          id?: string
          irrigation?: number
          name?: string
          planted_date?: string
          position?: string
          status?: string
          surface?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      harvests: {
        Row: {
          costs: number | null
          created_at: string | null
          field_id: string
          harvest_date: string
          id: string
          labor: number | null
          notes: string | null
          quality: string
          quantity: number
          status: string
          user_id: string
          weather: string | null
        }
        Insert: {
          costs?: number | null
          created_at?: string | null
          field_id: string
          harvest_date: string
          id?: string
          labor?: number | null
          notes?: string | null
          quality?: string
          quantity: number
          status?: string
          user_id: string
          weather?: string | null
        }
        Update: {
          costs?: number | null
          created_at?: string | null
          field_id?: string
          harvest_date?: string
          id?: string
          labor?: number | null
          notes?: string | null
          quality?: string
          quantity?: number
          status?: string
          user_id?: string
          weather?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "harvests_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "culture_fields"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          client_name: string
          created_at: string | null
          delivery_date: string | null
          harvest_id: string
          id: string
          notes: string | null
          payment_date: string | null
          price: number
          quantity: number
          sale_date: string
          status: string
          total_amount: number
          user_id: string
        }
        Insert: {
          client_name: string
          created_at?: string | null
          delivery_date?: string | null
          harvest_id: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          price?: number
          quantity: number
          sale_date: string
          status?: string
          total_amount?: number
          user_id: string
        }
        Update: {
          client_name?: string
          created_at?: string | null
          delivery_date?: string | null
          harvest_id?: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          price?: number
          quantity?: number
          sale_date?: string
          status?: string
          total_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_harvest_id_fkey"
            columns: ["harvest_id"]
            isOneToOne: false
            referencedRelation: "harvests"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
