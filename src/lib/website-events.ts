export const WEBSITE_EVENTS = ['website_tool_viewed','website_tool_started','website_tool_completed','website_download_clicked','website_qr_viewed'] as const;
export type WebEvent = typeof WEBSITE_EVENTS[number];
const dimensions = new Set(['page','tool','placement','locale']);
const sdkProperties = new Set(['distinct_id','$device_id','$session_id','$window_id','$lib','$lib_version','$process_person_profile']);
export function sanitizeDimensions(props: Record<string,string>) {
 return Object.fromEntries(Object.entries(props).filter(([key,value])=>dimensions.has(key)&&/^[a-zA-Z0-9_-]{1,100}$/.test(value)));
}
export function sanitizedCampaign(search:string) {
 const query=new URLSearchParams(search);
 return Object.fromEntries(['utm_source','utm_medium','utm_campaign'].flatMap(key=>{
  const value=query.get(key);return value&&/^[a-zA-Z0-9_-]{1,80}$/.test(value)?[[key,value]]:[];
 }));
}
/** Remove SDK-added URLs/referrers and unknown properties before transmission. */
export function sanitizeEnvelope(props: Record<string,unknown>) {
 const permitted=new Set([...dimensions,...sdkProperties,'surface','environment','utm_source','utm_medium','utm_campaign']);
 return Object.fromEntries(Object.entries(props).filter(([key])=>permitted.has(key)));
}
