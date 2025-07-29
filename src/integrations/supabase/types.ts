export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      buyers: {
        Row: {
          aadhar_number: string | null
          address: string | null
          contact: string
          created_at: string
          email: string | null
          id: string
          name: string
          pan_number: string | null
          updated_at: string
        }
        Insert: {
          aadhar_number?: string | null
          address?: string | null
          contact: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          pan_number?: string | null
          updated_at?: string
        }
        Update: {
          aadhar_number?: string | null
          address?: string | null
          contact?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          pan_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      lead_followups: {
        Row: {
          contacted_by: string | null
          created_at: string
          follow_up_date: string
          id: string
          lead_id: string | null
          next_follow_up: string | null
          notes: string
        }
        Insert: {
          contacted_by?: string | null
          created_at?: string
          follow_up_date: string
          id?: string
          lead_id?: string | null
          next_follow_up?: string | null
          notes: string
        }
        Update: {
          contacted_by?: string | null
          created_at?: string
          follow_up_date?: string
          id?: string
          lead_id?: string | null
          next_follow_up?: string | null
          notes?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_followups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          contact: string
          created_at: string
          customer_name: string
          email: string | null
          enquiry_source: string
          id: string
          interested_in: string | null
          lead_status: Database["public"]["Enums"]["lead_status"]
          next_follow_up: string | null
          notes: string | null
          project_id: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact: string
          created_at?: string
          customer_name: string
          email?: string | null
          enquiry_source: string
          id?: string
          interested_in?: string | null
          lead_status?: Database["public"]["Enums"]["lead_status"]
          next_follow_up?: string | null
          notes?: string | null
          project_id?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact?: string
          created_at?: string
          customer_name?: string
          email?: string | null
          enquiry_source?: string
          id?: string
          interested_in?: string | null
          lead_status?: Database["public"]["Enums"]["lead_status"]
          next_follow_up?: string | null
          notes?: string | null
          project_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          installment_label: string
          installment_number: number
          notes: string | null
          paid_amount: number | null
          paid_date: string | null
          payment_mode: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          receipt_url: string | null
          unit_sale_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          installment_label: string
          installment_number: number
          notes?: string | null
          paid_amount?: number | null
          paid_date?: string | null
          payment_mode?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          receipt_url?: string | null
          unit_sale_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          installment_label?: string
          installment_number?: number
          notes?: string | null
          paid_amount?: number | null
          paid_date?: string | null
          payment_mode?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          receipt_url?: string | null
          unit_sale_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_unit_sale_id_fkey"
            columns: ["unit_sale_id"]
            isOneToOne: false
            referencedRelation: "unit_sales"
            referencedColumns: ["id"]
          },
        ]
      }
      project_documents: {
        Row: {
          document_name: string
          document_type: string
          file_url: string
          id: string
          project_id: string | null
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          document_name: string
          document_type: string
          file_url: string
          id?: string
          project_id?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          document_name?: string
          document_type?: string
          file_url?: string
          id?: string
          project_id?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          apartment_type: string | null
          cover_photo: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          price_range_max: number | null
          price_range_min: number | null
          project_status: Database["public"]["Enums"]["project_status"]
          project_type: Database["public"]["Enums"]["project_type"]
          size_options: number[] | null
          total_commercial_units: number | null
          total_towers: number | null
          tower_details: Json | null
          updated_at: string
        }
        Insert: {
          apartment_type?: string | null
          cover_photo?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          price_range_max?: number | null
          price_range_min?: number | null
          project_status?: Database["public"]["Enums"]["project_status"]
          project_type: Database["public"]["Enums"]["project_type"]
          size_options?: number[] | null
          total_commercial_units?: number | null
          total_towers?: number | null
          tower_details?: Json | null
          updated_at?: string
        }
        Update: {
          apartment_type?: string | null
          cover_photo?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          price_range_max?: number | null
          price_range_min?: number | null
          project_status?: Database["public"]["Enums"]["project_status"]
          project_type?: Database["public"]["Enums"]["project_type"]
          size_options?: number[] | null
          total_commercial_units?: number | null
          total_towers?: number | null
          tower_details?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      unit_reservations: {
        Row: {
          broker_id: string | null
          broker_name: string | null
          contact: string
          created_at: string
          id: string
          notes: string | null
          reservation_date: string
          reserved_by: string
          unit_id: string | null
        }
        Insert: {
          broker_id?: string | null
          broker_name?: string | null
          contact: string
          created_at?: string
          id?: string
          notes?: string | null
          reservation_date: string
          reserved_by: string
          unit_id?: string | null
        }
        Update: {
          broker_id?: string | null
          broker_name?: string | null
          contact?: string
          created_at?: string
          id?: string
          notes?: string | null
          reservation_date?: string
          reserved_by?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unit_reservations_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_sales: {
        Row: {
          agreement_date: string | null
          broker_id: string | null
          broker_name: string | null
          buyer_id: string | null
          created_at: string
          final_price: number
          id: string
          notes: string | null
          possession_date: string | null
          registry_date: string | null
          sale_date: string
          unit_id: string | null
        }
        Insert: {
          agreement_date?: string | null
          broker_id?: string | null
          broker_name?: string | null
          buyer_id?: string | null
          created_at?: string
          final_price: number
          id?: string
          notes?: string | null
          possession_date?: string | null
          registry_date?: string | null
          sale_date: string
          unit_id?: string | null
        }
        Update: {
          agreement_date?: string | null
          broker_id?: string | null
          broker_name?: string | null
          buyer_id?: string | null
          created_at?: string
          final_price?: number
          id?: string
          notes?: string | null
          possession_date?: string | null
          registry_date?: string | null
          sale_date?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unit_sales_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_sales_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          amenities: string[] | null
          bhk_type: string | null
          block_tower: string | null
          carpet_area: number | null
          created_at: string
          facing: string | null
          floor_number: number | null
          frontage: number | null
          has_water_electricity: boolean | null
          id: string
          is_corner_plot: boolean | null
          price_per_sqft: number | null
          project_id: string | null
          road_width: number | null
          size_sqft: number | null
          total_price: number | null
          unit_number: string
          unit_status: Database["public"]["Enums"]["unit_status"]
          unit_type: Database["public"]["Enums"]["unit_type"]
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          bhk_type?: string | null
          block_tower?: string | null
          carpet_area?: number | null
          created_at?: string
          facing?: string | null
          floor_number?: number | null
          frontage?: number | null
          has_water_electricity?: boolean | null
          id?: string
          is_corner_plot?: boolean | null
          price_per_sqft?: number | null
          project_id?: string | null
          road_width?: number | null
          size_sqft?: number | null
          total_price?: number | null
          unit_number: string
          unit_status?: Database["public"]["Enums"]["unit_status"]
          unit_type: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          bhk_type?: string | null
          block_tower?: string | null
          carpet_area?: number | null
          created_at?: string
          facing?: string | null
          floor_number?: number | null
          frontage?: number | null
          has_water_electricity?: boolean | null
          id?: string
          is_corner_plot?: boolean | null
          price_per_sqft?: number | null
          project_id?: string | null
          road_width?: number | null
          size_sqft?: number | null
          total_price?: number | null
          unit_number?: string
          unit_status?: Database["public"]["Enums"]["unit_status"]
          unit_type?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          project_access: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          project_access?: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          project_access?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lead_status: "new" | "contacted" | "visited" | "negotiation" | "closed"
      payment_status: "pending" | "paid" | "overdue" | "partial"
      project_status:
        | "pre_launch"
        | "booking_open"
        | "under_construction"
        | "possession"
        | "completed"
      project_type:
        | "colony"
        | "apartment"
        | "villa"
        | "farmhouse"
        | "commercial"
      unit_status: "available" | "reserved" | "sold"
      unit_type: "plot" | "flat" | "villa" | "farmhouse" | "shop" | "office"
      user_role:
        | "admin"
        | "sales_manager"
        | "broker"
        | "accountant"
        | "viewer"
        | "builder"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lead_status: ["new", "contacted", "visited", "negotiation", "closed"],
      payment_status: ["pending", "paid", "overdue", "partial"],
      project_status: [
        "pre_launch",
        "booking_open",
        "under_construction",
        "possession",
        "completed",
      ],
      project_type: ["colony", "apartment", "villa", "farmhouse", "commercial"],
      unit_status: ["available", "reserved", "sold"],
      unit_type: ["plot", "flat", "villa", "farmhouse", "shop", "office"],
      user_role: [
        "admin",
        "sales_manager",
        "broker",
        "accountant",
        "viewer",
        "builder",
      ],
    },
  },
} as const
