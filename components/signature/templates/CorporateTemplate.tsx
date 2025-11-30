import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface CorporateTemplateProps {
  data: SignatureData;
}

export const CorporateTemplate = forwardRef<HTMLDivElement, CorporateTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Georgia, serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ paddingBottom: '15px', borderBottom: `3px solid ${data.accentColor}` }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    <tr>
                      {data.logo && (
                        <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                          <img
                            src={data.logo}
                            alt="Logo"
                            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                          />
                        </td>
                      )}
                      <td style={{ verticalAlign: 'top' }}>
                        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.5px' }}>
                          {data.name}
                        </h2>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                          {data.title}
                        </p>
                        {data.company && (
                          <p style={{ margin: '5px 0', fontSize: '14px', color: '#333', fontWeight: '600' }}>
                            {data.company}
                          </p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            
            <tr>
              <td style={{ paddingTop: '15px' }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '8px', fontSize: '13px', color: '#555' }}>
                          <strong style={{ color: data.accentColor, marginRight: '8px' }}>Email:</strong>
                          <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '8px', fontSize: '13px', color: '#555' }}>
                          <strong style={{ color: data.accentColor, marginRight: '8px' }}>Phone:</strong>
                          <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ paddingBottom: '8px', fontSize: '13px', color: '#555' }}>
                          <strong style={{ color: data.accentColor, marginRight: '8px' }}>Web:</strong>
                          <a href={data.website} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.website}
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>

            {(data.linkedin || data.twitter || data.github) && (
              <tr>
                <td style={{ paddingTop: '15px', borderTop: '1px solid #e0e0e0' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '12px', paddingTop: '10px' }}>
                            <a href={data.linkedin} style={{ textDecoration: 'none', color: data.accentColor, fontSize: '12px', fontWeight: '600' }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '12px', paddingTop: '10px' }}>
                            <a href={data.twitter} style={{ textDecoration: 'none', color: data.accentColor, fontSize: '12px', fontWeight: '600' }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td style={{ paddingTop: '10px' }}>
                            <a href={data.github} style={{ textDecoration: 'none', color: data.accentColor, fontSize: '12px', fontWeight: '600' }}>
                              GitHub
                            </a>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

CorporateTemplate.displayName = "CorporateTemplate";
