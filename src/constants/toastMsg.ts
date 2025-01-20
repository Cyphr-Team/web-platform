export const TOAST_MSG = {
  user: {
    sendInvitation: {
      title: "Send invitation",
      description: "Invitation has been sent successfully"
    },
    sendBulkInvitation: {
      title: "Send Bulk invitation",
      description: "Invitation(s) has been sent successfully"
    },
    sendBulkCSVInvitation: {
      title: "Send Bulk CSV invitation",
      description: "Invitation(s) has been sent successfully"
    },
    revokeInvitation: {
      title: "Revoke invitation",
      description: "Invitation has been revoked successfully"
    },
    editUserRole: {
      title: "Edit user roles",
      description: "User roles are edited successfully"
    },
    deactivateUser: {
      title: "Deactivate user",
      description: "User is deactivated successfully"
    },
    reactivateUser: {
      title: "Reactivate user",
      description: "User is reactivated successfully"
    },
    uploadDocument: {
      title: "Upload document",
      description: "Document is uploaded successfully"
    },
    deleteDocument: {
      title: "Remove document",
      description: "Document is removed successfully"
    },
    // Notifications for Stytch MFA
    stytchMagicLink: {
      title: "Stytch Magic Link",
      description: "Magic link has been sent successfully"
    },
    stytchOTP: {
      title: "Stytch OTP",
      description: "Magic link has been sent successfully"
    },
    stytchOAuth: {
      title: "Stytch OAuth",
      description: "OAuth has been sent successfully"
    },
    // Chat
    chat: {
      title: "Chat Service",
      description: "Chat has been sent successfully"
    }
  },
  loanProgram: {
    create: {
      title: "Creating loan program",
      description: "Loan program is created successfully"
    },
    update: {
      title: "Updating loan program",
      description: "Loan program is updated successfully"
    },
    delete: {
      title: "Deleting loan program",
      description: "Loan program has been deleted successfully"
    },
    updateStatus: {
      title: "Updating loan program status",
      description: "Loan program status is updated successfully"
    }
  },
  loanApplication: {
    submitError: {
      title: "Submit Loan Application",
      description: "Error occurred while submitting Loan Application"
    },
    submitOwner: {
      title: "Submit Loan Application",
      description: "Loan Application is submitted successfully"
    },
    submitKyc: {
      title: "Submit KYC Information",
      description: "KYC Information is submitted successfully"
    },
    submitConfirmation: {
      title: "Submit Confirmation Form",
      description: "Confirmation Form is submitted successfully"
    },
    submitLoanApplication: {
      title: "Submit Loan Application",
      description: "Loan Application is submitted successfully"
    },
    submitKyb: {
      title: "Submit KYB Information",
      description: "KYB Information is submitted successfully"
    },
    submitFinancial: {
      title: "Submit Financial Information",
      description: "Financial Information is submitted successfully"
    },
    uploadDocument: {
      title: "Upload Document",
      description: "Document is uploaded successfully"
    },
    submitDecision: {
      title: "Submit Loan Decision",
      description: "Loan Decision is submitted successfully"
    },
    createSuccess: {
      title: "Draft saved",
      description: "Application created successfully"
    },
    submitSuccess: {
      title: "Submit Loan Application",
      description: "Loan Application is submitted successfully"
    },
    updateSuccess: {
      title: "Updated Loan Application",
      description: "Loan Application is updated successfully"
    },
    updateJudgesSuccess: {
      title: "Updated successfully",
      description: "Update the assigned judges successfully"
    },
    updateJudgesFailed: {
      title: "Updated failed",
      description: "Updated the assigned judges failed"
    },
    payment: {
      title: "Payment result",
      description: "Your payment has been processed successfully"
    },
    paymentSubscription: {
      title: "Payment subscription",
      description:
        "Your LoanReady/ LoanReady+ subscription has been attached to this application"
    }
  },
  judgeLoanApplication: {
    submitScoreSuccess: {
      title: "Submit Score",
      description: "Score is submitted successfully"
    }
  },
  notification: {
    markAsRead: {
      title: "Mark as read",
      description: "Notification is marked as read successfully"
    },
    markAllAsRead: {
      title: "Mark all as read",
      description: "All notifications are marked as read successfully"
    },
    markAsUnread: {
      title: "Mark as unread",
      description: "Notification is marked as unread successfully"
    }
  },
  institution: {
    create: {
      title: "Create institution",
      description: "Institution is successfully created"
    }
  },
  featureFlag: {
    create: {
      title: "Create feature flag",
      description: "Feature flag is successfully created"
    },
    update: {
      title: "Update feature flag",
      description: "Feature flag is successfully updated"
    },
    delete: {
      title: "Delete feature flag",
      description: "Feature flag is successfully deleted"
    },
    toggleStatus: {
      title: "Toggle feature flag status",
      description: "Feature flag status is successfully updated"
    },
    toggleWhitelist: {
      title: "Toggle feature flag whitelist users",
      description: "Feature flag whitelist is successfully updated"
    }
  },
  whitelistUser: {
    update: {
      title: "Update whitelist user",
      description: "Whitelist users are successfully updated"
    },
    updateUserNotFound: {
      title: "Update invalid whitelist user",
      description: "Email not found"
    },
    updateDuplicatedUser: {
      title: "Update duplicated whitelist user",
      description: "User is already in the whitelist"
    },
    updateIncompleteField: {
      title: "Email and Institution are required",
      description: "Please complete all fields before adding to the whitelist."
    }
  },
  workspaceAdmin: {
    selectRoundSuccess: {
      title: "Application Round Selected Successfully"
    },
    selectRoundError: {
      title: "Failed to Select Application Round"
    },
    sendNudgeSuccess: {
      title: "Nudge Sent",
      description: "Nudge has been sent successfully"
    },
    sendNudgeError: {
      title: "Failed to Send Nudge"
    },
    changeStatusSuccess: {
      title: "Application Status Changed Successfully"
    },
    changeStatusError: {
      title: "Failed to Change Application Status"
    },
    proceedRefundSuccess: {
      title: "Refund Decision processed successfully"
    },
    proceedRefundError: {
      title: "Failed to process refund decision"
    }
  },
  identityVerification: {
    createFailed: {
      title: "Identity Verification failed"
    }
  },
  financialProjection: {
    scenarios: {
      createFailed: {
        title: "Create scenario failed",
        description: "Failed to create scenario"
      },
      updateFailed: {
        title: "Update scenario failed",
        description: "Failed to update scenario"
      },
      deleteFailed: {
        title: "Delete scenario failed",
        description: "Failed to delete scenario"
      },
      createSuccess: {
        title: "Create scenario success",
        description: "Scenario is created successfully"
      },
      updateSuccess: {
        title: "Update scenario success",
        description: "Scenario is updated successfully"
      },
      deleteSuccess: {
        title: "Delete scenario success",
        description: "Scenario is deleted successfully"
      }
    },
    transactionalMarketplaceRevenue: {
      submitFail: {
        title: "Fail to submit transactional/marketplace revenue",
        description: "Fail to submit transactional/marketplace revenue"
      }
    },
    saasRevenue: {
      submitFail: {
        title: "Fail to submit SaaS revenue",
        description: "Fail to submit SaaS revenue"
      }
    },
    recurringCharges: {
      submitFail: {
        title: "Fail to submit recurring charges",
        description: "Fail to submit recurring charges"
      }
    },
    expenseTaxRate: {
      submitFail: {
        title: "Fail to submit expense tax rate",
        description: "Fail to submit expense tax rate"
      }
    },
    forecastingSetup: {
      createFail: {
        title: "Fail to create forecasting setup",
        description: "Fail to create forecasting setup"
      }
    }
  },
  demo: {
    login: {
      title: "Login",
      description: "Login successfully"
    }
  }
}
