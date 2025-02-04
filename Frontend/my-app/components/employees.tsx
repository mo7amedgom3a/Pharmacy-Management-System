"use client"

import { useState } from "react"

import PharmacyEmployeeManagement from "./employee/pharmacy-employee-management"


export default function Employees() {
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <PharmacyEmployeeManagement />
    </div>
  )
}

