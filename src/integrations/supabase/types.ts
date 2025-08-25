export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      chats: {
        Row: {
          chatTitle: string | null
          createdAt: string | null
          id: string
          userId: string | null
        }
        Insert: {
          chatTitle?: string | null
          createdAt?: string | null
          id?: string
          userId?: string | null
        }
        Update: {
          chatTitle?: string | null
          createdAt?: string | null
          id?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_files: {
        Row: {
          created_at: string
          file_path: string
          folder_id: string | null
          id: number
          name: string
          number_of_pages: number | null
          owner: string
        }
        Insert: {
          created_at?: string
          file_path: string
          folder_id?: string | null
          id?: never
          name: string
          number_of_pages?: number | null
          owner: string
        }
        Update: {
          created_at?: string
          file_path?: string
          folder_id?: string | null
          id?: never
          name?: string
          number_of_pages?: number | null
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_files_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      drafted_reports: {
        Row: {
          content: string | null
          createdAt: string | null
          id: string
          title: string
          userId: string | null
        }
        Insert: {
          content?: string | null
          createdAt?: string | null
          id?: string
          title: string
          userId?: string | null
        }
        Update: {
          content?: string | null
          createdAt?: string | null
          id?: string
          title?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drafted_reports_user_id_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          file_id: number
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          file_id: number
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          file_id?: number
          id?: number
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "embeddings_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "document_files"
            referencedColumns: ["id"]
          },
        ]
      }
      gee_datasets: {
        Row: {
          asset_url: string | null
          dataset_id: string | null
          end_date: string | null
          id: number
          provider: string | null
          search_vector: unknown | null
          start_date: string | null
          tags: string | null
          thumbnail_url: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          asset_url?: string | null
          dataset_id?: string | null
          end_date?: string | null
          id?: number
          provider?: string | null
          search_vector?: unknown | null
          start_date?: string | null
          tags?: string | null
          thumbnail_url?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          asset_url?: string | null
          dataset_id?: string | null
          end_date?: string | null
          id?: number
          provider?: string | null
          search_vector?: unknown | null
          start_date?: string | null
          tags?: string | null
          thumbnail_url?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          chatId: string | null
          content: Json
          createdAt: string | null
          draftedReportId: string | null
          id: string
          role: string
          toolResult: Json | null
        }
        Insert: {
          chatId?: string | null
          content: Json
          createdAt?: string | null
          draftedReportId?: string | null
          id?: string
          role: string
          toolResult?: Json | null
        }
        Update: {
          chatId?: string | null
          content?: Json
          createdAt?: string | null
          draftedReportId?: string | null
          id?: string
          role?: string
          toolResult?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chatId"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_drafted_report_id_fkey"
            columns: ["draftedReportId"]
            isOneToOne: false
            referencedRelation: "drafted_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          license_end: string | null
          license_start: string | null
          name: string
          organization: string | null
          role: Database["public"]["Enums"]["user_role_enum"]
          subscription_tier: Database["public"]["Enums"]["subscription_tier_enum"]
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          license_end?: string | null
          license_start?: string | null
          name: string
          organization?: string | null
          role: Database["public"]["Enums"]["user_role_enum"]
          subscription_tier?: Database["public"]["Enums"]["subscription_tier_enum"]
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          license_end?: string | null
          license_start?: string | null
          name?: string
          organization?: string | null
          role?: Database["public"]["Enums"]["user_role_enum"]
          subscription_tier?: Database["public"]["Enums"]["subscription_tier_enum"]
        }
        Relationships: []
      }
      user_usage: {
        Row: {
          id: string
          knowledge_base_docs_count: number
          requests_count: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          knowledge_base_docs_count?: number
          requests_count?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          knowledge_base_docs_count?: number
          requests_count?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      search_documents_by_similarity: {
        Args:
          | { filter?: Json; match_count?: number; query_embedding: string }
          | {
              match_count?: number
              metadata_filter?: Json
              owner_uuid?: string
              query_embedding: string
            }
        Returns: {
          content: string
          id: number
          metadata: Json
        }[]
      }
      search_gee_datasets_ft: {
        Args: { query: string }
        Returns: {
          asset_url: string
          dataset_id: string
          end_date: string
          id: number
          rank: number
          start_date: string
          title: string
          type: string
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      subscription_tier_enum: "Essentials" | "Pro" | "Enterprise"
      user_role_enum: "ADMIN" | "USER" | "TRIAL" | "VIEWER"
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
      subscription_tier_enum: ["Essentials", "Pro", "Enterprise"],
      user_role_enum: ["ADMIN", "USER", "TRIAL", "VIEWER"],
    },
  },
} as const
