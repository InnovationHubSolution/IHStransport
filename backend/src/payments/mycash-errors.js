// M-Vatu API error codes (from the Vodafone M-Vatu gateway)
const MYCASH_ERROR_CODES = {
  600: 'API Key Error',
  601: 'Invalid User key (User is not matching API key passed)',
  602: 'Invalid Method passed',
  603: 'M-Vatu Payment system error',
  604: 'Invalid Product ID',
  605: 'Mandatory parameter is empty',
  606: 'Invalid customer mobile number'
};

function getMycashMessage(code, rawMessage) {
  const description = MYCASH_ERROR_CODES[code] || rawMessage || 'Unknown M-Vatu error';
  return code != null ? `${code}: ${description}` : (rawMessage || 'M-Vatu request failed');
}

function parseMycashError(axiosError) {
  const data = axiosError.response?.data;
  let code = typeof data?.code === 'number' ? data.code
    : typeof data?.errorCode === 'number' ? data.errorCode
    : typeof data?.status === 'number' && data.status >= 600 && data.status <= 606 ? data.status
    : null;
  const rawMessage = data?.message ?? data?.error ?? axiosError.message;
  const bodyText = typeof data === 'string' ? data : null;
  const fullText = (rawMessage || bodyText || axiosError.message || '').toLowerCase();
  if (code == null && (fullText.includes('secret key') || fullText.includes('api key'))) code = 600;
  if (code == null && fullText.includes('invalid') && fullText.includes('user')) code = 601;
  if (code == null && fullText.includes('product')) code = 604;
  if (code == null && (fullText.includes('mandatory') || fullText.includes('parameter'))) code = 605;
  if (code == null && fullText.includes('customer') && fullText.includes('mobile')) code = 606;
  const message = getMycashMessage(code, rawMessage || bodyText);
  return { code, message, description: MYCASH_ERROR_CODES[code] || rawMessage || bodyText };
}

module.exports = { MYCASH_ERROR_CODES, getMycashMessage, parseMycashError };
