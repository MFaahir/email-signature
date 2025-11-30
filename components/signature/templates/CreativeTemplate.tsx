import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface CreativeTemplateProps {
  data: SignatureData;
}

export const CreativeTemplate = forwardRef<HTMLDivElement, CreativeTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    <tr>
                      <td style={{ 
                        width: '6px', 
                        background: `linear-gradient(to bottom, ${data.accentColor}, ${data.accentColor}99)`,
                        paddingRight: '20px'
                      }}></td>
                      <td style={{ verticalAlign: 'top' }}>
                        <h2 style={{ 
                          margin: 0, 
                          fontSize: '28px', 
                          fontWeight: '900', 
                          color: '#000',
                          letterSpacing: '-0.5px',
                          textTransform: 'uppercase'
                        }}>
                          {data.name}
                        </h2>
                        <p style={{ 
                          margin: '8px 0', 
                          fontSize: '15px', 
                          color: data.accentColor,
                          fontWeight: '700',
                          letterSpacing: '1px'
                        }}>
                          {data.title}
                        </p>
                        {data.company && (
                          <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>
                            {data.company}
                          </p>
                        )}
                      </td>
                      {data.logo && (
                        <td style={{ paddingLeft: '30px', verticalAlign: 'top' }}>
                          <img
                            src={data.logo}
                            alt="Logo"
                            style={{ 
                              width: '70px', 
                              height: '70px', 
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                          />
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            
            <tr>
              <td style={{ paddingTop: '20px' }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ background: '#f8f8f8', padding: '15px', borderRadius: '8px' }}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '6px' }}>
                          <a href={`mailto:${data.email}`} style={{ 
                            color: '#000', 
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '6px' }}>
                          <a href={`tel:${data.phone}`} style={{ 
                            color: '#000', 
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td>
                          <a href={data.website} style={{ 
                            color: data.accentColor, 
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '700'
                          }}>
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
                <td style={{ paddingTop: '15px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '10px' }}>
                            <a href={data.linkedin} style={{ 
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              IN
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '10px' }}>
                            <a href={data.twitter} style={{ 
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              TW
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ 
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              GH
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

CreativeTemplate.displayName = "CreativeTemplate";
