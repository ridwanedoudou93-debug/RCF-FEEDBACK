import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: ''
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbYX7cMvZMA8Ju8ZO3zxoQQ8YhXVRWbCS-rnq9WP-zmqkftMI4tQwJNqtL37oDazQYaw/exec'

  const steps = [
    {
      questions: ['q1', 'q2', 'q3']
    },
    {
      questions: ['q4', 'q5', 'q6', 'q7']
    },
    {
      questions: ['q8', 'q9', 'q11']
    }
  ]

  const allQuestions = [
    {
      id: 'q1',
      text: 'هل أصبحت لديك فكرة أوضح عن شركة RCF وخدماتها؟',
      options: ['نعم بشكل واضح جدًا', 'ليس كثيرا']
    },
    {
      id: 'q2',
      text: 'كيف تقيّم الاستقبال والتنظيم داخل جناح RCF؟',
      options: ['ممتاز', 'جيد', 'يحتاج تحسين']
    },
    {
      id: 'q3',
      text: 'ماهو تقييمك لأسلوب و طريقة الشرح ؟',
      options: ['ممتازة', 'جيدة', 'مقبولة']
    },
    {
      id: 'q4',
      text: 'ما رأيك في الفريق الممثل لشركة RCF؟',
      options: ['احترافي ومتفاعل جدًا', 'يفي بالغرض', 'يحتاج إلى تحسين في التواصل']
    },
    {
      id: 'q5',
      text: 'هل كانت فكرة التسجيل وتبادل معلومات التواصل مقبولة ؟',
      options: ['نعم', 'نعم بتحفظ', 'لا']
    },
    {
      id: 'q6',
      text: 'ما رأيك في التكنولوجيات والوسائل المستخدمة داخل الجناح؟',
      options: ['مميزة و إبداعية', 'عادية']
    },
    {
      id: 'q7',
      text: 'كيف تقيّم المطويات والملفات التعريفية المقدمة؟',
      options: ['مفيدة و تقدم صورة واضحة', 'مقبولة', 'غير كافية']
    },
    {
      id: 'q8',
      text: 'ما رأيك في حسن الضيافة والإكراميات؟',
      options: ['ممتازة', 'جيدة', 'مقبولة']
    },
    {
      id: 'q9',
      text: 'ما أكثر شيء أعجبك في الجناح؟',
      options: ['طريقة الشرح', 'الفريق', 'التنظيم', 'التكنولوجيا المستخدمة', 'المنتجات والخدمات', 'الضيافة']
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isStepValid = () => {
    const stepQuestions = steps[currentStep].questions
    return stepQuestions.every(qId => {
      if (qId === 'q11') return true
      return formData[qId] !== ''
    })
  }

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('q1', formData.q1)
      formDataToSend.append('q2', formData.q2)
      formDataToSend.append('q3', formData.q3)
      formDataToSend.append('q4', formData.q4)
      formDataToSend.append('q5', formData.q5)
      formDataToSend.append('q6', formData.q6)
      formDataToSend.append('q7', formData.q7)
      formDataToSend.append('q8', formData.q8)
      formDataToSend.append('q9', formData.q9)
      formDataToSend.append('q10', formData.q10)
      formDataToSend.append('q11', formData.q11)

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      })

      setSubmitted(true)
    } catch (err) {
      setError('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getQuestionById = (id) => allQuestions.find(q => q.id === id)

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-4">شكرًا لك!</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-lg">تم استقبال ملاحظاتك بنجاح. نقدر وقتك وثقتك بنا.</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setCurrentStep(0)
              setFormData({
                q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: ''
              })
            }}
            className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#f47e1b] to-orange-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            إرسال ملاحظة أخرى
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-8 sm:p-10 text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 sm:mb-6 shadow-xl border-2 sm:border-4 border-white/20">
              <img src="/logo-rcf.png" alt="RCF Logo" className="h-16 sm:h-20 sm:h-24 object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl sm:text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">استبيان رأي</h1>
            <p className="text-slate-300 text-sm sm:text-base sm:text-lg font-medium mb-1 sm:mb-2">نقدر ملاحظاتك ونرحب بآرائك</p>
            <p className="text-green-300 text-xs sm:text-sm font-semibold bg-green-900/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl inline-block mb-4 sm:mb-6">
              🔒 الاستبيان لا يطلب أي معلومات شخصية
            </p>
            
            <div className="w-full max-w-sm mx-auto">
              <div className="flex justify-between mb-1.5 text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">الخطوة {currentStep + 1} من {steps.length}</span>
                <span className="text-slate-300 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#f47e1b] to-orange-400 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-5 sm:mx-8 sm:mx-10 mt-4 sm:mt-6 p-3 sm:p-5 bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl text-red-700 text-sm sm:text-base font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()} className="p-5 sm:p-8 sm:p-10">
            <div className="space-y-4 sm:space-y-6 sm:space-y-8">
              {steps[currentStep].questions.map((qId, index) => {
                if (qId === 'q11') {
                  return (
                    <div key={qId} className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-base sm:text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 sm:mb-5 flex items-center">
                        <span className="w-9 h-9 sm:w-10 sm:w-12 h-12 bg-gradient-to-br from-[#f47e1b] to-orange-500 text-white rounded-lg sm:rounded-xl sm:rounded-2xl flex items-center justify-center ml-3 sm:ml-4 font-black text-sm sm:text-base sm:text-xl shadow-md">
                          11
                        </span>
                        <span className="text-sm sm:text-base sm:text-lg">{q.text}</span>
                      </h3>
                      <textarea
                        name="q11"
                        value={formData.q11}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 sm:p-4 sm:p-5 border-2 border-slate-200 rounded-lg sm:rounded-xl focus:border-[#35a3fc] focus:outline-none resize-none text-sm sm:text-base sm:text-lg font-medium transition-all"
                        placeholder="اكتب اقتراحاتك هنا..."
                      ></textarea>
                    </div>
                  )
                }

                const q = getQuestionById(qId)
                const qNumber = allQuestions.findIndex(x => x.id === qId) + 1
                
                return (
                  <div key={qId} className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-base sm:text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 sm:mb-5 flex items-center">
                      <span className="w-9 h-9 sm:w-10 sm:w-12 h-12 bg-gradient-to-br from-[#f47e1b] to-orange-500 text-white rounded-lg sm:rounded-xl sm:rounded-2xl flex items-center justify-center ml-3 sm:ml-4 font-black text-sm sm:text-base sm:text-xl shadow-md">
                        {qNumber}
                      </span>
                      <span className="text-sm sm:text-base sm:text-lg">{q.text}</span>
                    </h3>
                    <div className="space-y-2 sm:space-y-3 sm:space-y-4">
                      {q.options.map((option) => (
                        <label 
                          key={option} 
                          className={`flex items-center p-3 sm:p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                            formData[qId] === option 
                              ? 'border-[#f47e1b] bg-gradient-to-r from-orange-50 to-orange-100 shadow-md' 
                              : 'border-slate-200 bg-white hover:border-[#35a3fc] hover:bg-blue-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={qId}
                            value={option}
                            checked={formData[qId] === option}
                            onChange={handleChange}
                            className="w-4 h-4 sm:w-5 sm:w-6 h-5 sm:h-6 text-[#f47e1b] focus:ring-[#f47e1b] focus:ring-offset-2"
                            required
                          />
                          <span className="mr-3 sm:mr-4 sm:mr-5 text-sm sm:text-base sm:text-lg font-semibold text-slate-800">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 sm:mt-10">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-3 sm:py-4 bg-slate-200 text-slate-800 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base sm:text-lg hover:bg-slate-300 transition-colors"
                >
                  السابق
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex-1 py-3 sm:py-4 bg-gradient-to-r from-[#f47e1b] to-orange-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base sm:text-lg transition-all transform hover:scale-[1.02] shadow-lg ${!isStepValid() ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'hover:opacity-90'}`}
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 sm:py-4 sm:py-5 sm:py-6 bg-gradient-to-r from-[#f47e1b] via-orange-500 to-[#f47e1b] text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg sm:text-xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 sm:h-6 sm:h-7 w-6 sm:w-7 ml-2 sm:ml-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الإرسال...
                    </span>
                  ) : (
                    'إرسال الملاحظات'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-center mt-6 sm:mt-8 sm:mt-10 text-slate-500">
          <p className="font-semibold text-xs sm:text-sm sm:text-base">© 2024 RCF. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  )
}

export default App
