import express from 'express';
import { ENV } from '../_core/env.js';
import { createClient } from '@supabase/supabase-js';
const router = express.Router();
const TABLE_NAME = 'inquiries_s_81141183_9';
router.post('/inquiries', async (req, res) => {
    try {
        const { name, company, email, phone, product, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email and message are required',
            });
        }
        const supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey);
        const ipAddress = req.headers['x-forwarded-for'] || req.ip || '';
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({
            name,
            company: company || null,
            email,
            phone: phone || null,
            product_interest: product || null,
            message,
            ip_address: ipAddress,
            status: 'new',
        })
            .select()
            .single();
        if (error) {
            console.error('[Inquiry] Database insert error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to save inquiry',
            });
        }
        sendDingTalkWorkNotification({ name, company, email, phone, product, message }).catch(err => {
            console.error('[Inquiry] DingTalk notification error:', err);
        });
        res.json({
            success: true,
            data: { id: data.id },
        });
    }
    catch (err) {
        console.error('[Inquiry] Unexpected error:', err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
async function getDingTalkAccessToken() {
    const appKey = process.env.DINGTALK_APP_KEY;
    const appSecret = process.env.DINGTALK_APP_SECRET;
    if (!appKey || !appSecret) {
        throw new Error('DINGTALK_APP_KEY and DINGTALK_APP_SECRET are required for work notifications');
    }
    const response = await fetch('https://api.dingtalk.com/v1.0/oauth2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appKey, appSecret }),
    });
    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.accessToken;
}
async function sendDingTalkWorkNotification(inquiry) {
    const targetUserId = process.env.DINGTALK_NOTIFY_USER_ID;
    if (!targetUserId) {
        console.log('[Inquiry] DINGTALK_NOTIFY_USER_ID not configured, skipping notification');
        return;
    }
    const productLabels = {
        'non-woven': 'Non-woven Products',
        'gauze-cotton': 'Gauze & Cotton Products',
        'surgical-kits': 'Surgical Kits',
        'custom': 'Custom Products',
    };
    const productLabel = productLabels[inquiry.product || ''] || inquiry.product || 'Not specified';
    const accessToken = await getDingTalkAccessToken();
    const oaBody = {
        msgtype: 'oa',
        oa: {
            msgurl: '',
            head: {
                text: 'New Website Inquiry',
            },
            body: {
                title: '🔔 New Inquiry',
                content: `Name: ${inquiry.name}\n` +
                    `Company: ${inquiry.company || 'Not provided'}\n` +
                    `Email: ${inquiry.email}\n` +
                    `Phone: ${inquiry.phone || 'Not provided'}\n` +
                    `Product: ${productLabel}\n` +
                    `Message: ${inquiry.message}`,
            },
        },
    };
    const response = await fetch('https://api.dingtalk.com/v1.0/message/workNotifications/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-acs-dingtalk-access-token': accessToken,
        },
        body: JSON.stringify({
            userId: targetUserId,
            agentId: parseInt(process.env.DINGTALK_AGENT_ID || '0'),
            msgKey: 'sampleOA',
            msgParam: JSON.stringify(oaBody),
        }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DingTalk work notification failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    console.log('[Inquiry] DingTalk work notification sent successfully to user:', targetUserId);
}
export default router;
