import { ENV } from '../_core/env.js';
export class StorageService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    /**
     * Get the bucket name based on corpId and optional suffix.
     * Default pattern: {corpId}-images
     */
    getBucketName(suffix = 'images') {
        return ENV.bucketName;
    }
    /**
     * Upload a file to Supabase Storage.
     * Returns the standardized public URL.
     */
    async upload(filePath, fileBuffer, contentType, bucketSuffix, upsert = true) {
        const bucket = this.getBucketName(bucketSuffix);
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(filePath, fileBuffer, {
            contentType,
            upsert,
        });
        if (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }
        const publicUrl = `/storage/v1/object/public/${bucket}/${data.path}`;
        return { publicUrl, filePath: data.path, bucket };
    }
    /**
     * Delete one or more files from Supabase Storage.
     */
    async delete(filePaths, bucketSuffix) {
        const bucket = this.getBucketName(bucketSuffix);
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .remove(filePaths);
        if (error) {
            throw new Error(`Delete failed: ${error.message}`);
        }
        const deleted = (data || []).map((item) => item.name);
        return { deleted };
    }
    /**
     * List files in a given folder path.
     */
    async list(folderPath = '', bucketSuffix) {
        const bucket = this.getBucketName(bucketSuffix);
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .list(folderPath, { sortBy: { column: 'created_at', order: 'desc' } });
        if (error) {
            throw new Error(`List failed: ${error.message}`);
        }
        return (data || []).map((file) => ({
            name: file.name,
            size: file.metadata?.size,
            contentType: file.metadata?.mimetype,
            createdAt: file.created_at,
            publicUrl: `/storage/v1/object/public/${bucket}/${folderPath ? folderPath + '/' : ''}${file.name}`,
        }));
    }
    /**
     * Get the public URL for a given file path.
     */
    getPublicUrl(filePath, bucketSuffix) {
        const bucket = this.getBucketName(bucketSuffix);
        return `/storage/v1/object/public/${bucket}/${filePath}`;
    }
}
