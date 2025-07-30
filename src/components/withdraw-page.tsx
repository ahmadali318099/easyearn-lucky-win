"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/app/page"
import { Banknote, AlertCircle, CheckCircle, X } from "lucide-react"

export function WithdrawPage() {
  const { user, setUser } = useUser()
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const minWithdraw = 20
  const canWithdraw = user?.hasDeposited && user?.referralCount >= 2 && user?.luckyDrawEntries >= 1

  const handleWithdraw = () => {
    if (!canWithdraw) {
      alert("You must meet all withdrawal conditions first.")
      return
    }

    if (Number.parseFloat(amount) < minWithdraw) {
      alert(`Minimum withdrawal is $${minWithdraw}`)
      return
    }

    if (Number.parseFloat(amount) > (user?.balance || 0)) {
      alert("Insufficient balance")
      return
    }

    if (!walletAddress) {
      alert("Please enter your wallet address")
      return
    }

    setIsProcessing(true)

    // Simulate withdrawal processing
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          balance: user.balance - Number.parseFloat(amount),
        })
      }
      setIsProcessing(false)
      setAmount("")
      setWalletAddress("")
      alert("Withdrawal request submitted! Processing time: 24-48 hours.")
    }, 2000)
  }

  const conditions = [
    {
      label: "Made a deposit",
      met: user?.hasDeposited || false,
      description: "Minimum $10 deposit required",
    },
    {
      label: "Referred 2+ friends",
      met: (user?.referralCount || 0) >= 2,
      description: `Current referrals: ${user?.referralCount || 0}/2`,
    },
    {
      label: "Participated in Lucky Draw",
      met: (user?.luckyDrawEntries || 0) >= 1,
      description: `Lucky draw entries: ${user?.luckyDrawEntries || 0}/1`,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Withdraw Funds</h1>
        <p className="text-gray-600 mt-2">Request a withdrawal to your Binance wallet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Withdrawal Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Requirements</CardTitle>
            <CardDescription>You must meet all conditions below to withdraw funds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    condition.met ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {condition.met ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${condition.met ? "text-green-900" : "text-red-900"}`}>
                    {condition.label}
                  </p>
                  <p className="text-sm text-gray-600">{condition.description}</p>
                </div>
              </div>
            ))}

            <div
              className={`mt-6 p-4 rounded-lg border ${
                canWithdraw ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center">
                {canWithdraw ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <p className={`font-medium ${canWithdraw ? "text-green-900" : "text-red-900"}`}>
                  {canWithdraw
                    ? "All conditions met! You can withdraw."
                    : "Complete all requirements to unlock withdrawals."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Banknote className="h-5 w-5 mr-2" />
              Request Withdrawal
            </CardTitle>
            <CardDescription>
              Minimum: ${minWithdraw} | Available: ${user?.balance || 0}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={minWithdraw}
                max={user?.balance || 0}
                step="0.01"
                disabled={!canWithdraw}
              />
              <p className="text-sm text-gray-600">
                Processing fee: $2 | You'll receive: ${amount ? (Number.parseFloat(amount) - 2).toFixed(2) : "0.00"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet">Binance Wallet Address</Label>
              <Input
                id="wallet"
                placeholder="Enter your USDT (TRC-20) wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                disabled={!canWithdraw}
                className="font-mono text-sm"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Withdrawal Information:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Processing time: 24-48 hours</li>
                    <li>Processing fee: $2 per withdrawal</li>
                    <li>Only USDT (TRC-20) supported</li>
                    <li>Double-check your wallet address</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={
                !canWithdraw || !amount || Number.parseFloat(amount) < minWithdraw || isProcessing || !walletAddress
              }
              className="w-full"
            >
              {isProcessing ? "Processing..." : "Request Withdrawal"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal History */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>Your recent withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Banknote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No withdrawals yet. Complete the requirements to make your first withdrawal!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
