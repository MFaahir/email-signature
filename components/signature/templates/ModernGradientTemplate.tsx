import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface ModernGradientTemplateProps {
  data: SignatureData;
}

export const ModernGradientTemplate = forwardRef<HTMLDivElement, ModernGradientTemplateProps>(
  ({ data }, ref) => {
    const gradientColor = data.accentColor + '33'; // Add transparency
    
    return (
      <div ref={ref} style={{ fontFamily: 'Inter, Arial, sans-serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ 
                background: `linear-gradient(135deg, ${gradientColor} 0%, transparent 100%)`,
                padding: '20px',
                borderRadius: '12px'
              }}>
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
                              borderRadius: '10px'
                            }}
                          />
                        </td>
                      )}
                      <td style={{ verticalAlign: 'middle' }}>
                        <h2 style={{ 
                          margin: 0, 
                          fontSize: '24px', 
                          fontWeight: '800', 
                          color: '#000',
                          background: `linear-gradient(135deg, ${data.accentColor} 0%, #000 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {data.name}
                        </h2>
                        <p style={{ margin: '6px 0', fontSize: '14px', color: '#555', fontWeight: '600' }}>
                          {data.title}
                        </p>
                        {data.company && (
                          <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
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
                        <td style={{ paddingBottom: '6px', fontSize: '13px' }}>
                          <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '13px' }}>
                          <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '13px' }}>
                          <a href={data.website} style={{ color: data.accentColor, textDecoration: 'none', fontWeight: '600' }}>
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
                <td style={{ paddingTop: '12px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '8px' }}>
                            <a href={data.linkedin} style={{ 
                              display: 'inline-block',
                              padding: '6px 14px',
                              background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.accentColor}CC 100%)`,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '20px'
                            }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '8px' }}>
                            <a href={data.twitter} style={{ 
                              display: 'inline-block',
                              padding: '6px 14px',
                              background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.accentColor}CC 100%)`,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '20px'
                            }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ 
                              display: 'inline-block',
                              padding: '6px 14px',
                              background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.accentColor}CC 100%)`,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '20px'
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

ModernGradientTemplate.displayName = "ModernGradientTemplate";
