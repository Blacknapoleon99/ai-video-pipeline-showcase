import {z} from "zod";

export const mackWopBumperSchema = z.object({
  brandName: z.string().min(1),
  logoSrc: z.string().min(1),
  portraits: z.array(z.string().min(1)).min(1).max(8),
  stingAudioSrc: z.string().min(1).nullable().optional(),
  backgroundMode: z.enum(["transparent", "black"]).optional(),
});

export type MackWopBumperProps = z.infer<typeof mackWopBumperSchema>;
