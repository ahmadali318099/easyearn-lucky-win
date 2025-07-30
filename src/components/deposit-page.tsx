"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/UserContext"
import { Copy, CheckCircle, AlertCircle, CreditCard } from "lucide-react"

export function DepositPage() {
  const { user, setUser } = useUser()
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)

  const binanceAddress = "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"
  const minDeposit = 10

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(binanceAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeposit = () => {
    if (Number.parseFloat(amount) < minDeposit) {
      alert(`Minimum deposit is $${minDeposit}`)
      return
    }

    setIsProcessing(true)

    // Simulate deposit processing
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          balance: user.balance + Number.parseFloat(amount),
          hasDeposited: true,
        })
      }
      setIsProcessing(false)
      setAmount("")
      alert("Deposit successful! Your account has been credited.")
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Deposit Funds</h1>
        <p className="text-gray-600 mt-2">Add funds to your account using Binance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deposit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Make a Deposit
            </CardTitle>
            <CardDescription>Minimum deposit: ${minDeposit} | Only Binance transfers accepted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Deposit Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={minDeposit}
                step="0.01"
              />
              <p className="text-sm text-gray-600">
                Minimum: ${minDeposit} | Current Balance: ${user?.balance || 0}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Binance Wallet Address</Label>
              <div className="flex items-center space-x-2">
                <Input value={binanceAddress} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="flex-shrink-0 bg-transparent"
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              {copied && <p className="text-sm text-green-600">Address copied to clipboard!</p>}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Instructions:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Only send USDT (TRC-20) to this address</li>
                    <li>Minimum deposit: ${minDeposit}</li>
                    <li>Deposits are processed within 10-30 minutes</li>
                    <li>Double-check the address before sending</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDeposit}
              disabled={!amount || Number.parseFloat(amount) < minDeposit || isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing Deposit..." : "Confirm Deposit"}
            </Button>
          </CardContent>
        </Card>

        {/* Deposit Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why Deposit?</CardTitle>
            <CardDescription>Unlock premium features and earning opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Unlock Task Earning</h4>
                  <p className="text-sm text-gray-600">Access high-paying tasks and start earning immediately</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Higher Withdrawal Limits</h4>
                  <p className="text-sm text-gray-600">Increase your daily and monthly withdrawal limits</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Premium Support</h4>
                  <p className="text-sm text-gray-600">Get priority customer support and faster response times</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Bonus Opportunities</h4>
                  <p className="text-sm text-gray-600">Access exclusive bonuses and promotional offers</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-900 mb-2">Current Status</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">Account Status:</span>
                <Badge variant={user?.hasDeposited ? "default" : "secondary"}>
                  {user?.hasDeposited ? "Premium" : "Basic"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deposits */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Deposits</CardTitle>
          <CardDescription>Your deposit history</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.hasDeposited ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">USDT Deposit</p>
                  <p className="text-sm text-gray-600">Jan 15, 2024 • Completed</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+$18.00</p>
                  <Badge variant="outline" className="text-xs">
                    Confirmed
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No deposits yet. Make your first deposit to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
