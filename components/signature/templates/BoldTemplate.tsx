import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface BoldTemplateProps {
  data: SignatureData;
}

export const BoldTemplate = forwardRef<HTMLDivElement, BoldTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Impact, Arial Black, sans-serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ background: data.accentColor, padding: '15px 20px' }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    <tr>
                      {data.logo && (
                        <td style={{ paddingRight: '20px', verticalAlign: 'middle' }}>
                          <img
                            src={data.logo}
                            alt="Logo"
                            style={{ 
                              width: '70px', 
                              height: '70px', 
                              objectFit: 'contain',
                              filter: 'brightness(0) invert(1)'
                            }}
                          />
                        </td>
                      )}
                      <td style={{ verticalAlign: 'middle' }}>
                        <h2 style={{ 
                          margin: 0, 
                          fontSize: '26px', 
                          fontWeight: '900', 
                          color: '#fff',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {data.name}
                        </h2>
                        <p style={{ margin: '4px 0', fontSize: '14px', color: '#fff', opacity: 0.9, fontWeight: '700' }}>
                          {data.title}
                        </p>
                        {data.company && (
                          <p style={{ margin: '4px 0', fontSize: '13px', color: '#fff', opacity: 0.8 }}>
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
              <td style={{ padding: '15px 20px', background: '#f5f5f5' }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '14px', fontWeight: '700' }}>
                          <a href={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '14px', fontWeight: '700' }}>
                          <a href={`tel:${data.phone}`} style={{ color: '#000', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '14px', fontWeight: '700' }}>
                          <a href={data.website} style={{ color: data.accentColor, textDecoration: 'none' }}>
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
                <td style={{ padding: '12px 20px', background: '#000' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '15px' }}>
                            <a href={data.linkedin} style={{ 
                              color: '#fff', 
                              textDecoration: 'none', 
                              fontSize: '12px', 
                              fontWeight: '700',
                              textTransform: 'uppercase'
                            }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '15px' }}>
                            <a href={data.twitter} style={{ 
                              color: '#fff', 
                              textDecoration: 'none', 
                              fontSize: '12px', 
                              fontWeight: '700',
                              textTransform: 'uppercase'
                            }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ 
                              color: '#fff', 
                              textDecoration: 'none', 
                              fontSize: '12px', 
                              fontWeight: '700',
                              textTransform: 'uppercase'
                            }}>
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

BoldTemplate.displayName = "BoldTemplate";
