/**
 * Submits contact form data to VITE_CONTACT_ENDPOINT if configured,
 * otherwise falls back to opening prefilled mailto: link.
 */
export async function submitContact(formData, fallbackEmail = 'hello@example.com') {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      return { success: true, method: 'api' };
    } catch (err) {
      console.warn('API submission failed, falling back to mailto:', err);
      // Fall through to mailto fallback
    }
  }

  // Fallback: mailto link
  const subject = encodeURIComponent(
    formData.service ? `Project inquiry: ${formData.service}` : `Portfolio contact from ${formData.name || 'Visitor'}`
  );
  const body = encodeURIComponent(
    `Name: ${formData.name || ''}\nEmail: ${formData.email || ''}\nService: ${formData.service || 'General'}\n\nMessage:\n${formData.message || ''}`
  );
  window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;

  return { success: true, method: 'mailto' };
}
