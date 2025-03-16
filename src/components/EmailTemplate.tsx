import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface EmailTemplateProps {
  firstName?: string;
  callSummary?: string;
  callDuration?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName = 'there',
  callSummary,
  callDuration,
}) => (
  <Html>
    <Head />
    <Preview>Your QAULI Call Summary</Preview>
    <Body style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      margin: '0 auto',
    }}>
      <Container style={{ 
        padding: '20px',
        margin: '0 auto',
        maxWidth: '600px',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
      }}>
        <Heading style={{ 
          color: '#333',
          textAlign: 'center',
          fontSize: '24px',
        }}>
          Your Call Summary
        </Heading>
        
        <Text>Hello {firstName},</Text>
        
        <Text>Thank you for trying out QAULI! Here's a summary of your recent call:</Text>
        
        {callDuration && (
          <Text>
            <strong>Call Duration:</strong> {callDuration}
          </Text>
        )}
        
        {callSummary && (
          <Section style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '15px', 
            borderRadius: '5px', 
            margin: '20px 0' 
          }}>
            <Heading as="h3" style={{ marginTop: '0', color: '#333', fontSize: '18px' }}>
              Call Summary
            </Heading>
            <Text style={{ marginBottom: '0' }}>{callSummary}</Text>
          </Section>
        )}
        
        <Text>Want to learn more about how QAULI can help your real estate business?</Text>
        
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button
            href="https://qauli.com/#pricing"
            style={{
              backgroundColor: '#4a90e2',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            View Our Pricing
          </Button>
        </Section>
        
        <Text>If you have any questions, feel free to reply to this email.</Text>
        
        <Text>
          Best regards,<br />
          The QAULI Team
        </Text>
        
        <Hr style={{ 
          borderTop: '1px solid #e0e0e0',
          margin: '30px 0 20px 0',
        }} />
        
        <Text style={{ 
          fontSize: '12px',
          color: '#777',
          textAlign: 'center',
        }}>
          © 2024 QAULI. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
); 