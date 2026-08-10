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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chapter_media: {
        Row: {
          audio_path: string | null
          chapter: number
          created_at: string
          id: string
          page: number
          transcript: string | null
          updated_at: string
        }
        Insert: {
          audio_path?: string | null
          chapter: number
          created_at?: string
          id?: string
          page: number
          transcript?: string | null
          updated_at?: string
        }
        Update: {
          audio_path?: string | null
          chapter?: number
          created_at?: string
          id?: string
          page?: number
          transcript?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chapter_resources: {
        Row: {
          chapter: number
          created_at: string
          description: string | null
          id: string
          page: number
          sort_order: number
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          chapter: number
          created_at?: string
          description?: string | null
          id?: string
          page: number
          sort_order?: number
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          chapter?: number
          created_at?: string
          description?: string | null
          id?: string
          page?: number
          sort_order?: number
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      chapter_stats: {
        Row: {
          attempts: number
          chapter: string
          correct: number
          created_at: string
          id: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          chapter: string
          correct?: number
          created_at?: string
          id?: string
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          chapter?: string
          correct?: number
          created_at?: string
          id?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chapters: {
        Row: {
          created_at: string
          id: number
          page_count: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: number
          page_count?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          page_count?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_titles: {
        Row: {
          chapter: number
          created_at: string
          id: string
          page: number
          title: string
          updated_at: string
        }
        Insert: {
          chapter: number
          created_at?: string
          id?: string
          page: number
          title: string
          updated_at?: string
        }
        Update: {
          chapter?: number
          created_at?: string
          id?: string
          page?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer_tolerance: number | null
          chapter: number
          choices: Json
          correct_index: number
          created_at: string
          explanation: string | null
          id: string
          numeric_answer: string | null
          page: number
          prompt: string
          question_type: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer_tolerance?: number | null
          chapter: number
          choices: Json
          correct_index: number
          created_at?: string
          explanation?: string | null
          id?: string
          numeric_answer?: string | null
          page: number
          prompt: string
          question_type?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer_tolerance?: number | null
          chapter?: number
          choices?: Json
          correct_index?: number
          created_at?: string
          explanation?: string | null
          id?: string
          numeric_answer?: string | null
          page?: number
          prompt?: string
          question_type?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
