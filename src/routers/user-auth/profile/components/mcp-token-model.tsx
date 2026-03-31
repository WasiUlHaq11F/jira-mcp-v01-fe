import React, { useState } from 'react';
import { Copy, Link, Check, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Alert,
  AlertDescription,
  Input,
} from '@/components/ui';
import { BASE_URL } from '@/config/app';

interface MCPTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MCPTokenModal: React.FC<MCPTokenModalProps> = ({ open, onOpenChange }) => {
  const [copied, setCopied] = useState(false);
  const mcpUrl = `${BASE_URL}/mcp`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mcpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Get MCP OAuth Link
          </DialogTitle>
          <DialogDescription>
            Create a secure OAuth connection link for MCP (Model Context Protocol) integration.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> This OAuth link is used to connect your MCP server via
              Custom Connectors. You must copy this link and configure it in your connector setup.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label className="text-sm font-medium">OAuth Connection URL</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={mcpUrl}
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Copy this OAuth link and add it in Custom Connectors configuration to connect your MCP server.
          </p>

          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="font-medium mb-1">How to use:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Copy the OAuth link</li>
              <li>Go to Custom Connectors</li>
              <li>Add a new connector</li>
              <li>Paste the link and complete setup</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MCPTokenModal;
