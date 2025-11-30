import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface RoundedIconsTemplateProps {
  data: SignatureData;
}

export const RoundedIconsTemplate = forwardRef<HTMLDivElement, RoundedIconsTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Inter, Arial, sans-serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    <tr>
                      {data.logo && (
                        <td style={{ paddingRight: '20px', verticalAlign: 'middle' }}>
                          <img
                            src={data.logo}
                            alt="Logo"
                            style={{ 
                              width: '60px', 
                              height: '60px', 
                              objectFit: 'contain',
                              borderRadius: '50%',
                              border: `2px solid ${data.accentColor}`
                            }}
                          />
                        </td>
                      )}
                      <td style={{ verticalAlign: 'middle' }}>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#000' }}>
                          {data.name}
                        </h2>
                        <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                          {data.title}
                        </p>
                        {data.company && (
                          <p style={{ margin: '4px 0', fontSize: '13px', color: data.accentColor, fontWeight: '600' }}>
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
                <td style={{ paddingTop: '15px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '8px' }}>
                            <a href={data.linkedin} style={{ 
                              display: 'inline-block',
                              width: '32px',
                              height: '32px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: '700',
                              borderRadius: '50%',
                              textAlign: 'center',
                              lineHeight: '32px'
                            }}>
                              in
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '8px' }}>
                            <a href={data.twitter} style={{ 
                              display: 'inline-block',
                              width: '32px',
                              height: '32px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: '700',
                              borderRadius: '50%',
                              textAlign: 'center',
                              lineHeight: '32px'
                            }}>
                              tw
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ 
                              display: 'inline-block',
                              width: '32px',
                              height: '32px',
                              background: data.accentColor,
                              color: '#fff',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: '700',
                              borderRadius: '50%',
                              textAlign: 'center',
                              lineHeight: '32px'
                            }}>
                              gh
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

RoundedIconsTemplate.displayName = "RoundedIconsTemplate";
