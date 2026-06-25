import { SupabaseClient } from '@supabase/supabase-js';
export interface UploadResult {
    publicUrl: string;
    filePath: string;
    bucket: string;
}
export interface DeleteResult {
    deleted: string[];
}
export declare class StorageService {
    private supabase;
    constructor(supabase: SupabaseClient);
    /**
     * Get the bucket name based on corpId and optional suffix.
     * Default pattern: {corpId}-images
     */
    private getBucketName;
    /**
     * Upload a file to Supabase Storage.
     * Returns the standardized public URL.
     */
    upload(filePath: string, fileBuffer: Buffer, contentType: string, bucketSuffix?: string, upsert?: boolean): Promise<UploadResult>;
    /**
     * Delete one or more files from Supabase Storage.
     */
    delete(filePaths: string[], bucketSuffix?: string): Promise<DeleteResult>;
    /**
     * List files in a given folder path.
     */
    list(folderPath?: string, bucketSuffix?: string): Promise<{
        name: any;
        size: any;
        contentType: any;
        createdAt: any;
        publicUrl: string;
    }[]>;
    /**
     * Get the public URL for a given file path.
     */
    getPublicUrl(filePath: string, bucketSuffix?: string): string;
}
